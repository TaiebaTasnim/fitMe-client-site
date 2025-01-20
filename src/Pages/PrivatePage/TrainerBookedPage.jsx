import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { TiTick } from "react-icons/ti";
import usePackege from "../../hooks/usePackege";


const TrainerBookedPage = () => {
      const {index,id}=useParams()
      const axiosSecure=useAxiosSecure()
      const [packages]=usePackege()
      //console.log(packages)
   
      const { data: trainer, isLoading, isError, error } = useQuery({
            queryKey: ["trainer", id],
            queryFn: async () => {
                  const res = await axiosSecure.get(`/trainers/${id}`);
                  return res.data;
                },
          });
        
          if (isLoading) return <LoadingSpinner></LoadingSpinner>;
          if (isError) return <p>Error: {error.message}</p>;
      return (
            <div className="container mx-auto w-[90%]">
                   <div className="bg-white shadow-lg py-6 px-4 sm:px-8 lg:px-16">
        <div className="flex items-center gap-6">
          <img
            src={trainer.profile_image}
            alt={trainer.full_name}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{trainer.full_name}</h1>
            <div>
                  <h1>Selected Slot : {trainer.available_days[index]} :  {trainer.available_time.start} - {trainer.available_time.end}</h1>
            </div>
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
          </div>
        </div>
      </div>
      {/* Packages Section */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Choose Your Membership
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg shadow-md bg-blue-100"
            >
              <h3 className="text-xl font-bold mb-4 text-black">{pkg.name}</h3>
              <ul className="mb-4 space-y-2 text-black">
                {pkg.benefits.map((benefit, i) => (
                  <li key={i} className="text-gray-700 flex items-start">
                    <span className="text-green-500 mr-2"><TiTick className="text-2xl"></TiTick></span> {benefit}
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <p className="text-lg font-semibold mb-4 text-black">Price:$ {pkg.price}</p>
                <Link to={`/Payment/${index}/${id}/${pkg._id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
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