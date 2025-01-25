import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";


const BookedSlotDetails = () => {
      const axiosSecure=useAxiosSecure()
      const {email}=useParams()
      const { data: bookedSlots = {}, isLoading, isError, error} = useQuery({
            queryKey: ["bookedSlots", email], // queryKey with email for uniqueness
            queryFn: async () => {
              const response = await axiosSecure.get(`/payments/details/${email}`);
              console.log(response.data)
              return response.data; // Assuming response contains the 'slots' array
            },
            enabled: !!email, // The query runs only when email is available
          });

          if (isLoading) {
            return <LoadingSpinner></LoadingSpinner>;
          }
        
          if (isError) {
            return <div>Error: {error.message}</div>;
          }

          const { email:bookerEmail, trainerEmail, transactionId, date, packageDetails } = bookedSlots

      return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                  <Helmet><title>FitMe | Booked Slot Details</title></Helmet>
      <div className="max-w-md bg-white rounded-2xl shadow-lg space-y-4 p-10">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Booked Slot Details</h2>
        <p>
          <span className="font-semibold">Booked By:</span> {bookerEmail}
        </p>
        <p>
          <span className="font-semibold">Trainer:</span> {trainerEmail}
        </p>
        <p>
          <span className="font-semibold">Package Name:</span>{" "}
          {packageDetails?.name || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Price:</span> $
          {packageDetails?.price || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Transaction ID:</span> {transactionId}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {new Date(date).toLocaleString()}
        </p>
      </div>
    </div>
      );
};

export default BookedSlotDetails;