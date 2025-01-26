import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import { useState } from "react";
import { Helmet } from "react-helmet";

const AppliedTrainerDetails = () => {
  const { email } = useParams();
  console.log(email)
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const [feedback, setFeedback] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleReject =async () => {
    updateTrainer("rejected");
    try {
      
      // Save feedback to the feedbackCollection
      await axiosSecure.post(`/feedback`, {
        trainer_id: trainer._id,
        email: trainer.email,
        feedback,
      });

      toast.success(" Feedback saved successfully!");
      refetch(); // Refetch trainer details
      setIsModalOpen(false); // Close modal
      navigate("/dashboard/appliedTrainers");
    } catch (error) {
      toast.error("Failed to reject the trainer. Please try again.");
      console.error(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Helmet><title>FitMe | Details of Applied Trainer {trainer?.full_name}</title></Helmet>
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
             onClick={() => setIsModalOpen(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reject
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[#abc502] text-black px-4 py-2 rounded "
          >
            Confirm
          </button>
        </div>
         {/* Modal for Rejection Feedback */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 container mx-auto w-[90%]">
            <h3 className="text-lg font-bold mb-4">Provide Rejection Feedback</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              rows="4"
              placeholder="Enter feedback..."
            ></textarea>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    
  );
};

export default AppliedTrainerDetails;
