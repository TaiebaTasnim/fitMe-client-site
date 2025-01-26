import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const Balance = () => {
  const axiosSecure = useAxiosSecure();

  const { data: length = {} } = useQuery({
    queryKey: ['length'],
    queryFn: async () => {
      const res = await axiosSecure.get('/newsletter-vs-paid');
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payments2');
      return res.data;
    },
  });

  const { data: balance = {} } = useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      const res = await axiosSecure.get('/totalBalance');
      return res.data;
    },
  });

  const pieChartData = [
    { name: 'Subscribers', value: length.totalSubscribers || 0 },
    { name: 'Paid Members', value: length.paidMembers || 0 },
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-white mt-6 md:mt-0 rounded-2xl shadow-lg ">
      <Helmet>
        <title>FitMe | Balance</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-gray-800 text-center">Balance Overview</h1>

      <div className="flex justify-center items-center flex-col  ">

       <div className='flex flex-col justify-around gap-10 md:flex-row  w-full'>
       <div className='mt-10 space-y-4'>
        <p className="text-2xl text-center md:text-start md:text-5xl ">Total Balance</p>
        <p className="text-4xl text-center mt-10 font-bold text-[#abc502]">${balance.totalBalance || 0}</p>
       </div>
       <div className="text-center">
        <h3 className="text-lg font-semibold mb-3">Newsletter Subscribers vs Paid Members</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#abc502' : '#82ca9d'} />
              ))}
            </Pie>
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
       
      </div>
       <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg shadow w-full">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Latest Transactions</h2>
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border text-left">#</th>
              <th className="p-3 border text-left">Trainer</th>
              <th className="p-3 border text-left">User</th>
              <th className="p-3 border text-left">Amount</th>
              <th className="p-3 border text-left">Package</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{payment.trainerEmail}</td>
                <td className="p-3 border">{payment.bookerEmail}</td>
                <td className="p-3 border">${payment.price}</td>
                <td className="p-3 border text-[#abc502] font-semibold">{payment.packageName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       
       </div>

     

     
    </div>
  );
};

export default Balance;
