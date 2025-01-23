import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const TrainerDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { trainerId } = useParams();

  const { data: trainer, isLoading, isError, error } = useQuery({
    queryKey: ["trainer", trainerId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${trainerId}`);
      return res.data;
    },
  });

  const convertTo12HourFormat = (time) => {
    const [hour, minute] = time.split(":");
    let hourInt = parseInt(hour);
    const suffix = hourInt >= 12 ? "PM" : "AM";
    hourInt = hourInt % 12 || 12; // Convert 0-11 to 12-hour format
    return `${hourInt}:${minute} ${suffix}`;
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Trainer Info Section */}
            <div className="p-8">
              <div className="flex flex-col items-center text-center">
                <img
                  src={trainer?.profile_image}
                  alt={trainer.full_name}
                  className="w-32 h-32 rounded-full shadow-lg mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-800">{trainer.full_name}</h2>
                <p className="text-gray-600">Age: {trainer.age}</p>
                <p className="text-gray-600">
                  Experience: {trainer.years_of_experience} years
                </p>
              </div>

              {/* Biography */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-700">Biography</h3>
                <p className="text-gray-600 mt-2">{trainer.biography}</p>
              </div>

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

              {/* Social Links */}
              <div className="mt-6 flex justify-center gap-4">
                {trainer.facebook_profile && (
                  <a
                    href={trainer.facebook_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-2xl hover:scale-110 transition-transform"
                  >
                    <FaFacebook />
                  </a>
                )}
                {trainer.instagram_profile && (
                  <a
                    href={trainer.instagram_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 text-2xl hover:scale-110 transition-transform"
                  >
                    <FaInstagram />
                  </a>
                )}
              </div>
            </div>

            {/* Available Slots Section */}
            <div className="p-8 bg-gradient-to-br from-[#abc502] to-[#006400] text-white">
              <h2 className="text-2xl font-bold text-center mb-6">Available Slots</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-[#006400] text-white">
                      <th className="px-4 py-2 text-left">Slot Name</th>
                      <th className="px-4 py-2 text-left">Day</th>
                      <th className="px-4 py-2 text-left">Time</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trainer.slots.map((slot, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="px-4 py-2">{slot.slot_name}</td>
                        <td className="px-4 py-2">{slot.available_day}</td>
                        <td className="px-4 py-2">
                          {convertTo12HourFormat(slot.available_time.start)} -{" "}
                          {convertTo12HourFormat(slot.available_time.end)}
                        </td>
                        <td className="px-4 py-2">
                          <Link
                            to={`/trainerBooked/${index}/${trainer._id}`}
                            className="block w-full mt-2 px-4 py-2 bg-white text-[#006400] rounded-lg font-medium shadow-lg hover:bg-gray-100 transition"
                          >
                            Book Slot
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerDetails;
