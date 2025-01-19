import { useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner"; // Custom loading spinner
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Axios hook
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AuthContext)

  // Fetch trainers with "Pending" or "Rejected" status
  const { data: trainers = [], isLoading, isError, error } = useQuery({
      queryKey: ["trainers", user?.email],
      queryFn: async () => {
        const response = await axiosSecure.get(`/trainers1?email=${user?.email}`);
        return response.data;
      },
      enabled: !!user?.email, // Only run if email is available
    });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <section className="container mx-auto p-6">
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
                    <FaEye className="text-black cursor-pointer hover:text-[#abc502]" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ActivityLog;
