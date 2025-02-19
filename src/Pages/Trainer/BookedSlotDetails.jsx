import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";

const BookedSlotDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { email } = useParams();

  const { data: bookedSlots = [], isLoading, isError, error } = useQuery({
    queryKey: ["bookedSlots", email], // queryKey with email for uniqueness
    queryFn: async () => {
      const response = await axiosSecure.get(`/payments/details/${email}`);
      console.log(response.data);
      return response.data; // Assuming response contains an array of booked slots
    },
    enabled: !!email, // The query runs only when email is available
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center    dark:bg-black mt-6 md:mt-0">
      <Helmet>
        <title>FitMe | Booked Slot Details</title>
      </Helmet>
      <div className="max-w-3xl bg-white rounded-2xl shadow-lg p-10 space-y-8">
        <h2 className="text-2xl font-bold mb-4 text-[#abc502] text-center">
          Booked Slot Details
        </h2>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
       {bookedSlots.length > 0 ? (
          bookedSlots.map((slot, index) => (
            <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
              <p>
                <span className="font-semibold">Booked By:</span> {slot.email}
              </p>
              <p>
                <span className="font-semibold">Trainer:</span> {slot.trainerEmail}
              </p>
              <p>
                <span className="font-semibold">Package Name:</span>{" "}
                {slot.packageDetails?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Price:</span> ${slot.packageDetails?.price || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Transaction ID:</span> {slot.transactionId}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(slot.date).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No booked slots found.</p>
        )}
       </div>
      </div>
    </div>
  );
};

export default BookedSlotDetails;
