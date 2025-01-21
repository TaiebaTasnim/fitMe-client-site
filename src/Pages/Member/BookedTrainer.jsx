import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const BookedTrainer = () => {
      const axiosSecure = useAxiosSecure();
      const {user}=useContext(AuthContext)
      

      // Fetch trainer details using react-query
      const { data: payments = [], isLoading, isError } = useQuery({
        queryKey: ["payments",user?.email], // Unique key for this query
        queryFn: async () => {
          const response = await axiosSecure.get(`/payments/${user?.email}`); // Fetch from backend
          console.log(response.data); // Log data for debugging
          return response.data; // Return the trainers array
        },
        enabled: !!user?.email,
      });
    
      if (isLoading) {
        return <LoadingSpinner />;
      }
    
      if (isError) {
        return (
          <p className="text-center text-red-500">
            Error fetching trainer details. Please try again.
          </p>
        );
      }
      return (
            <section className="container mx-auto p-6 my-10 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Trainer Details</h1>

      {payments?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-[#abc502] text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Trainer Email</th>
                <th className="px-4 py-2">Skills</th>
                <th className="px-4 py-2">Selected Slot</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  } hover:bg-gray-300 transition duration-300`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{payment.name}</td>
                 
                       
                 <td  className="px-4 py-2 text-center">{payment.skills.join(', ')}</td>
                  
                  
                  <td className="px-4 py-2 text-center">{payment.slotDate} : {payment.slotTime.start}- {payment.slotTime.end}</td>
                  <td className="px-4 py-2 text-center">${payment.price}</td>
                  <td className="px-4 py-2 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-700">No trainer details found.</p>
      )}
    </section>
      );
};

export default BookedTrainer;

