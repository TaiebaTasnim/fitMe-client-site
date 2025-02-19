import { Link} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  

  const { data: trainers = [], isLoading, isError, error } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const response = await axiosSecure.get("/trainers2");
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="">
      <Helmet><title>FitMe | Applied Trainers</title></Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 text-[#abc502]">All Aplied Trainers</h1>
      <div className="w-36 h-[2px] mx-auto bg-[#abc502] mb-8 text-center"></div>

     <div className="container mx-auto p-6 my-10 bg-gray-100 rounded-lg shadow-lg">
     {
        trainers.length > 0 ? (
          <div className="overflow-x-auto">

        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer.email}>
                <td className="border px-4 py-2">{trainer.full_name}</td>
                <td className="border px-4 py-2">{trainer.email}</td>
                <td className="border px-4 py-2">{trainer.status}</td>
                <td className="border px-4 py-2">
                  <Link to={`/dashboard/appliedTrainerDetails/${trainer.email}`}>
                  <button
                    className="text-blue-500 hover:underline"
                    
                  >
                    Details
                  </button>
                  </Link>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        ):(
          <p className="text-center text-gray-700 dark:text-gray-400">No application for trainer found.</p>
        )
      }
     </div>
    </div>
  );
};

export default AppliedTrainers;
