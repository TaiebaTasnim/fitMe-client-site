import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../Shared/LoadingSpinner";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch the top 6 most booked classes
  const { data: classes = [], isLoading, isError, error } = useQuery({
    queryKey: ["featuredClasses"], // Unique key for this query
    queryFn: async () => {
      const response = await axiosPublic.get("/classes/featured"); // Fetch from backend
      console.log(response.data); // Debugging
      return response.data.classes; // Return the classes array
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error fetching classes: {error.message}
      </p>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-black dark:py-16">
      <section className="container mx-auto w-[90%] p-4 my-10 dark:my-0 ">
        <h1 className="text-3xl font-bold text-center mb-6 mt-6 dark:mt-0  text-[#abc502]">
          Featured Classes
        </h1>
        <div className="w-36 mx-auto h-[2px] bg-[#abc502] mb-12 text-center"></div>

        {classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-6 dark:pb-0">
            {classes.map((classItem) => (
              <div
                key={classItem._id}
                className="bg-white rounded-lg shadow-2xl hover:shadow-xl transition duration-300 flex flex-col h-full dark:border-[#abc502] dark:border-2 "
              >
                <img
                  src={classItem.class_image}
                  alt={classItem.class_name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-[#abc502]">{classItem.class_name}</h2>
                  <p className="text-sm text-gray-700 mt-2 flex-grow">
                    {classItem.class_details.length > 80
                      ? `${classItem.class_details.substring(0, 80)}...`
                      : classItem.class_details}
                  </p>
                  <p className="mt-4 text-[#abc502] font-semibold">
                    Bookings: {classItem.bookingCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700">No classes found.</p>
        )}
      </section>
    </div>
  );
};

export default FeaturedClasses;
