import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../Shared/LoadingSpinner";

const TeamSection = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch verified trainers
  const { data: trainers = [], isLoading, isError, error } = useQuery({
    queryKey: ["verifiedTrainers"], // Unique query key
    queryFn: async () => {
      const response = await axiosPublic.get("/trainers");
      console.log(response.data.trainers) // Backend endpoint
      return response.data.trainers; // Return verified trainers
    },
  });

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error fetching trainers: {error.message}
      </p>
    );
  }

  if (trainers.length < 3) {
    return (
      <p className="text-center text-gray-700">
        Not enough verified trainers available.
      </p>
    );
  }

  return (
    <section className=" p-4 my-10 dark:my-0 bg-gray-100 dark:py-10 shadow-lg dark:bg-black">
      <h1 className="text-3xl font-bold text-center mb-6 mt-6 dark:mt-0 text-[#abc502]">Meet Our Team</h1>
      <div className="w-36 mx-auto h-[2px] bg-[#abc502] mb-12 text-center"></div>

      <div className="container mx-auto w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 dark:pb-0">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white p-4 rounded-lg shadow-2xl hover:shadow-lg transition duration-300 dark:border-[#abc502] dark:border-2"
          >
            <img
              src={trainer.profile_image}
              alt={trainer.full_name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <h2 className="text-lg font-bold  text-[#abc502]">{trainer.full_name}</h2>
              <p className="text-sm text-gray-600 mt-2">
                {trainer.biography.slice(0, 100)}...
              </p>
              <h3 className="text-md font-semibold text-[#abc502] mt-4">
                Areas of Expertise:
              </h3>
              <ul className="list-disc list-inside text-sm  mt-2">
                {trainer.skills.map((skill, index) => (
                  <li key={index} className="text-gray-700">{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
