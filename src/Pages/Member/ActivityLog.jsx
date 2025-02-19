import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner"; 
import useAxiosSecure from "../../hooks/useAxiosSecure"; 
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: trainers = [], isLoading, isError, error } = useQuery({
    queryKey: ["trainers", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/trainers1?email=${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email, 
  });

  const { data: feedback = [] } = useQuery({
    queryKey: ["feedback", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/feedback/${user?.email}`);
      return response.data;
    },
    enabled: clicked, 
  });

  const handleFeedback = () => {
    setClicked(true);
    setIsModalOpen(true);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <section className="container mx-auto px-4 py-6">
      <Helmet>
        <title>FitMe | Activity Log</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 text-[#abc502]">My Activity Log</h1>
      <div className="w-36 h-[2px] mx-auto bg-[#abc502] mb-8 text-center"></div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-[#abc502] text-black text-sm uppercase">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer, index) => (
              <tr key={trainer.email} className="border-t border-gray-200">
                <td className="px-4 py-4 text-gray-700">{index + 1}</td>
                <td className="px-4 py-4 text-gray-700">{trainer.full_name}</td>
                <td className="px-4 py-4 text-gray-700">{trainer.email}</td>
                <td className="px-4 py-4 text-gray-700 flex items-center gap-2">
                  <span>{trainer.status}</span>
                  {trainer.status === "rejected" && (
                    <FaEye 
                      onClick={handleFeedback} 
                      className="text-[#abc502] cursor-pointer hover:text-[#8a9b02] transition duration-300" 
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] md:w-[60%]">
            <h3 className="text-lg font-bold mb-4">Rejection Feedback</h3>
            <p>{feedback.feedback || "No feedback available"}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
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
