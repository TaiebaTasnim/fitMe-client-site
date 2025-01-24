
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Balance = () => {
  
  const axiosSecure=useAxiosSecure()
  //const [transactions, setTransactions] = useState([]);

    // Fetch newsletter vs paid members data
  
  const { data: length ={} } = useQuery({
      queryKey: ["length"],
      queryFn: async () => {
        const res = await axiosSecure.get("/newsletter-vs-paid");
        return res.data;
      }
    });
    console.log(length)

  

    // Fetch the last six transactions
    const { data: payments =[] } = useQuery({
      queryKey: ["payments"],
     queryFn: async () => {
       const res = await axiosSecure.get("/payments2");
       return res.data;
     }
   });
   console.log(payments)
//     axios.get('/payments2')
//       .then((response) => {
//             console.log(response.data)
//         setTransactions(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching transactions:", error);
//       });
// Fetch total balance
    const { data: balance ={} } = useQuery({
       queryKey: ["balance"],
      queryFn: async () => {
        const res = await axiosSecure.get("/totalBalance");
        return res.data;
      }
    });
    console.log(balance)
    

  // Prepare data for pie chart
  const pieChartData = [
    { name: 'Subscribers', value: length.totalSubscribers },
    { name: 'Paid Members', value: length.paidMembers },
  ];

  return (
    <div className='space-y-4'>
      <div className="balance-section">
        <h2>Total Balance</h2>
        <p>${balance.totalBalance}</p>
      </div>

      <div className="overflow-x-auto">
        <h3>Last 6 Transactions</h3>
        <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
          <thead>
            <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-center">#</th>    
              <th className="border px-4 py-2">Trainer Email</th>
              <th className="border px-4 py-2">Booker Email</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Package Name</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index}>
                  <td className="border px-4 py-2">{index+1}</td>
                <td className="border px-4 py-2">{payment.trainerEmail}</td>
                <td className="border px-4 py-2">{payment.bookerEmail}</td>
                <td className="border px-4 py-2">{payment.transactionId}</td>
                <td className="border px-4 py-2">${payment.price}</td>
                <td className="border px-4 py-2">{payment.packageName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="chart-section">
        <h3>Newsletter Subscribers vs Paid Members</h3>
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
              label
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#8884d8'} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Balance;
