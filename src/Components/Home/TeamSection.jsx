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
    <section className=" p-6 my-10 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Meet Our Team</h1>

      <div className="container mx-auto w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white p-4 rounded-lg shadow-2xl hover:shadow-lg transition duration-300"
          >
            <img
              src={trainer.profile_image}
              alt={trainer.full_name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="mt-4">
              <h2 className="text-lg font-bold text-gray-900">{trainer.full_name}</h2>
              <p className="text-sm text-gray-600 mt-2">
                {trainer.biography.slice(0, 100)}...
              </p>
              <h3 className="text-md font-semibold text-gray-800 mt-4">
                Areas of Expertise:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                {trainer.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
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
