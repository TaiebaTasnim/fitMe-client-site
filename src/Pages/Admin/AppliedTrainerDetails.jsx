import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import toast from "react-hot-toast";

const AppliedTrainerDetails = () => {
  const { email } = useParams();
  console.log(email)
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch the trainer details using tanstack query
  const { data: trainer, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["trainer", email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/trainers3/${email}`);
      return response.data;
    },
  });

  // Handler for updating the trainer's status
  const updateTrainer = async (status, role = null) => {
    try {
      const payload = { status,skills: trainer.skills };
      if (role) {
        payload.role = role;
      }

      // Use axios.patch to update the trainer in the backend
      await axiosSecure.patch(`/trainers/${email}`, payload);

      toast.success("Trainer status updated successfully!");
      refetch(); // Optionally refetch data to ensure the UI is updated
      navigate("/dashboard/appliedTrainers");
    } catch (err) {
      toast.error("Failed to update trainer status. Please try again.");
      console.error(err.message);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {error.message}</p>;

  const handleConfirm = () => {
    updateTrainer("verified", "trainer");
  };

  const handleReject = () => {
    updateTrainer("rejected");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trainer Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <img
          src={trainer?.profile_image}
          alt={trainer.full_name}
          className="w-32 h-32 rounded-full object-cover mx-auto"
        />
        <h2 className="text-xl font-bold text-center mt-4">{trainer.full_name}</h2>
        <p className="text-gray-600 text-center">{trainer.email}</p>
        <p className="text-gray-700 mt-4">{trainer.biography}</p>
        <p className="text-gray-600">Age: {trainer.age}</p>
        <p className="text-gray-600">
                        Experience: {trainer.years_of_experience} years
                      </p>
                       {/* Skills */}
                    <div className="mt-6">
                      <h3 className="text-lg font-bold text-gray-700">Skills</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {trainer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#abc502] text-black rounded-full text-sm font-medium shadow-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                     
                      
                      
                       
           </div>           
        <div className="flex justify-between mt-6">
          <button
            onClick={handleReject}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reject
          </button>
          <button
            onClick={handleConfirm}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Confirm
          </button>
        </div>
      </div>
    
  );
};

export default AppliedTrainerDetails;
