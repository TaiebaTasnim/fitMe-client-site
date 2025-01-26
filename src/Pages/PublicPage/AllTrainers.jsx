import { useQuery } from "@tanstack/react-query";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const AllTrainers = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch trainers with "verified" status
  const { data: trainers = [], isLoading } = useQuery({
    queryKey: ["verifiedTrainers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trainers/verified");
      console.log(res.data);
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

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Helmet><title>FitMe | All Trainers</title></Helmet>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Verified Trainers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-10">
        {trainers.map((trainer) => (
          <div
            key={trainer._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
          >
            <img
              src={trainer.profile_image}
              alt={trainer.full_name}
              className="w-full h-60 object-cover"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {trainer.full_name}
              </h2>
              <p className="text-gray-600 mb-2"><strong>Age:</strong> {trainer.age}</p>
              <p className="text-gray-600 mb-2">
                <strong>Experience:</strong> {trainer.years_of_experience} years
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Skills:</strong> {trainer.skills.join(", ")}
              </p>
              <p className="text-gray-600 mb-2"><strong>Available Slots:</strong></p>
              <div className="mb-4 grid grid-cols-2 gap-3">
                
                {trainer.slots.map((slot, index) => (
                  <div key={index} className="">
                    <div  className="text-gray-600 mb-2 ">
                    <strong>{slot.slot_name}</strong>
                    <div>
                      <strong>Days: </strong>
                      {slot.available_day}
                    </div>
                    <div>
        <strong>Time: </strong>
        {convertTo12HourFormat(slot.available_time.start)} - {convertTo12HourFormat(slot.available_time.end)}
      </div>
                  </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                {trainer.facebook_profile && (
                  <a
                    href={trainer.facebook_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaFacebook size={24} />
                  </a>
                )}
                {trainer.instagram_profile && (
                  <a
                    href={trainer.instagram_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700"
                  >
                    <FaInstagram size={24} />
                  </a>
                )}
              </div>
            </div>
            <div className="pb-6 pr-6 text-right mt-auto">
              <Link to={`/trainerDetails/${trainer._id}`}>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#abc502] text-black font-medium rounded-lg hover:bg-black hover:text-white focus:ring-[#abc502] focus:outline-none"
                >
                  Know More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTrainers;
