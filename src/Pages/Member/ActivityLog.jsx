import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner"; // Custom loading spinner
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Axios hook
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AuthContext)
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch trainers with "Pending" or "Rejected" status
  const { data: trainers = [], isLoading, isError, error } = useQuery({
      queryKey: ["trainers", user?.email],
      queryFn: async () => {
        const response = await axiosSecure.get(`/trainers1?email=${user?.email}`);
        return response.data;
      },
      enabled: !!user?.email, // Only run if email is available
    });

    const { data: feedback = [] } = useQuery({
      queryKey: ["feedback", user?.email],
      queryFn: async () => {
        const response = await axiosSecure.get(`/feedback/${user?.email}`);
        console.log(feedback)
        return response.data;
      },
      enabled: clicked, 
    });

    const handlefeedback=()=>{
      setClicked(true);
      setIsModalOpen(true)

    }

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <section className="container mx-auto p-6">
      <Helmet><title>FitMe | Activity Log</title></Helmet>
      <h1 className="text-2xl font-bold mb-4">Activity Log</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer,index) => (
              <tr key={trainer.email} className="border-t border-gray-200">
                  <td className="px-6 py-4 text-sm text-gray-700">{index+1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{trainer.full_name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{trainer.email}</td>
                <td className="px-6 py-4 text-sm text-gray-700 flex items-center gap-2">
                  <span>{trainer.status}</span>
                  {trainer.status === "rejected" && (
                    <FaEye onClick={handlefeedback} className="text-black cursor-pointer hover:text-[#abc502]" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       {/* Feedback Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h3 className="text-lg font-bold mb-4">Rejection Feedback</h3>
            <p>{feedback.feedback}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ActivityLog;
