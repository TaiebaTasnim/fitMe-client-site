import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import ReactStars from "react-rating-stars-component";
import toast from "react-hot-toast";

const BookedTrainer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  console.log(user);

  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch trainer details using react-query
  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments/${user?.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const convertTo12HourFormat = (time) => {
      const [hour, minute] = time.split(":");
      let hourInt = parseInt(hour);
      const suffix = hourInt >= 12 ? "PM" : "AM";
      hourInt = hourInt % 12 || 12; // Convert 0-11 to 12-hour format
      return `${hourInt}:${minute} ${suffix}`;
    };

  const openModal = (trainer) => {
    setSelectedTrainer(trainer);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedTrainer(null);
    setFeedback("");
    setRating(0);
  };

  const submitReview = async () => {
    try {
      const reviewData = {
        trainerEmail: selectedTrainer.trainerEmail,
        userName: user?.displayName,
        image: user?.photoURL,
        feedback,
        rating,
      };
      await axiosSecure.post("/reviews", reviewData); // Send review data to the backend
      toast("Review submitted successfully!");
      closeModal();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error fetching trainer details. Please try again.</p>;
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
                  className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"} hover:bg-gray-300 transition duration-300`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{payment.trainerEmail}</td>
                  <td className="px-4 py-2 text-center">{payment.skills.join(", ")}</td>
                  <td className="px-4 py-2 text-center">
                    {payment.slotDate} :{convertTo12HourFormat(payment.slotTime.start)} -{" "}
                    {convertTo12HourFormat(payment.slotTime.end)}
                  </td>
                  <td className="px-4 py-2 text-center">${payment.price}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      onClick={() => openModal(payment)}
                    >
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

      {/* Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
            <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Write your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Rating:</label>
              <ReactStars
                count={5}
                size={30}
                activeColor="#ffd700"
                value={rating}
                onChange={(newRating) => setRating(newRating)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={submitReview}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookedTrainer;
