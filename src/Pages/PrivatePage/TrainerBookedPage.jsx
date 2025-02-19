import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { TiTick } from "react-icons/ti";
import usePackege from "../../hooks/usePackege";
import { Helmet } from "react-helmet";

const TrainerBookedPage = () => {
  const { index, id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const [packages] = usePackege();

  const { data: trainer, isLoading, isError, error } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trainers/${id}`);
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

  const slot = trainer.slots[index];
  const classNames=slot.class_name
  const skills = Array.isArray(classNames) ? classNames : [classNames];


  return (
    <div className="">
      <Helmet><title>FitMe | Selected Slot info</title></Helmet>
      {/* Trainer Info Section */}
      <div className="  pt-32 px-4 sm:px-8 lg:px-4 mb-8">
        <div className="flex md:justify-center items-center gap-6">
          <img
            src={trainer.profile_image}
            alt={trainer.full_name}
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-[#abc502]">{trainer.full_name}</h1>
            <p className="text-gray-600 dark:text-gray-400">Selected Slot: {slot.available_day}</p>
            <p className="text-gray-600 dark:text-gray-400">
              Time: {convertTo12HourFormat(slot.available_time.start)} -{" "}
              {convertTo12HourFormat(slot.available_time.end)}
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-400">Classes</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
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
        </div>
      </div>

      {/* Packages Section */}
      <div className="container w-[90%] mx-auto pb-10 px-4 pt-10 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#abc502]">Choose Your Membership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg shadow-md bg-gradient-to-r from-[#abc502] to-[#006400] text-white"
            >
              <h3 className="text-xl font-bold mb-4">{pkg.name}</h3>
              <ul className="mb-4 space-y-2">
                {pkg.benefits.map((benefit, i) => (
                  <li key={i} className="text-gray-200 flex items-start">
                    <span className="text-green-400 mr-2">
                      <TiTick className="text-2xl" />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p className="text-lg font-semibold mb-4">Price: $ {pkg.price}</p>
                <Link to={`/Payment/${index}/${id}/${pkg._id}`}>
                  <button className="px-6 py-2 bg-[#006400] text-white rounded-lg hover:bg-[#004d28] transition duration-300">
                    Join Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerBookedPage;
