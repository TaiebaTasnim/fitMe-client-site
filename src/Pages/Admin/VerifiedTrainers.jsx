import { FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const VerifiedTrainers = () => {
      const axiosSecure=useAxiosSecure()
      const { data: trainers = [], isLoading,refetch } = useQuery({
            queryKey: ["verifiedTrainers"],
            queryFn: async () => {
              const res = await axiosSecure.get("/trainers/verified");
              console.log(res.data)
              return res.data;
            },
          });
          const handleDeleteTrainer = async (email) => {
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!',
            }).then(async (result) => {
              if (result.isConfirmed) {
                try {
                  // Delete trainer from database
                  await axiosSecure.delete(`/trainers/${email}`);
          
                  refetch()
          
                  // Show success message
                  Swal.fire({
                        title: "Deleted!",
                        text: "Your visa has been deleted.",
                        icon: "success"
                  });
                } catch (error) {
                  console.error('Error deleting trainer:', error);
          
                  // Show error message
                  Swal.fire('Error!', 'Failed to delete trainer. Please try again.', 'error');
                }
              }
            });
          };
        if (isLoading) return <LoadingSpinner />;
      return (
            <div className="">
              <Helmet><title>FitMe | All Verified Trainers</title></Helmet>
              <h1 className="text-3xl font-bold text-center mb-6 text-[#abc502]">All Trainers : {trainers.length}</h1>
      <div className="w-36 h-[2px] mx-auto bg-[#abc502] mb-8 text-center"></div>

     
     <div className="container mx-auto p-6 my-10 bg-gray-100 rounded-lg shadow-lg">
     {trainers.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-400 text-center">No verified trainers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-[#abc502]">
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((trainer) => (
              <tr key={trainer._id}>
                <td className="border border-gray-300 px-4 py-2">{trainer.full_name}</td>
                <td className="border border-gray-300 px-4 py-2">{trainer.email}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteTrainer(trainer.email)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
     </div>
    </div>
      );
};

export default VerifiedTrainers;