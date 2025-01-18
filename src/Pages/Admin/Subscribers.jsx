import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Subscribers = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all subscribers using react-query
  const { data: subscribers = [], isLoading, isError } = useQuery({
      queryKey: ["allSubscribers"], // Unique key for this query
      queryFn: async () => {
        const response = await axiosSecure.get("/subscribers"); // Fetch from backend
        console.log(response.data); // Log data for debugging
        return response.data.subscribers; // Return the subscribers array
      },
    });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error fetching subscribers. Please try again.
      </p>
    );
  }

  return (
    <section className="container mx-auto p-6 my-10 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">All Newsletter Subscribers</h1>

      {subscribers?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-[#abc502] text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber, index) => (
                <tr
                  key={subscriber._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                  } hover:bg-gray-300 transition duration-300`}
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2 text-center">{subscriber.name}</td>
                  <td className="px-4 py-2 text-center">{subscriber.email}</td>
                  <td className="px-4 py-2 text-center">
                    {new Date(subscriber.subscribedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-700">No subscribers found.</p>
      )}
    </section>
  );
};

export default Subscribers;
