import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { FaCalendar } from "react-icons/fa";
import { Link } from "react-router-dom";


const RecentForums = () => {
      const axiosPublic=useAxiosPublic()
      const { data: forums = [], isLoading, isError, error } = useQuery({
            queryKey: ["recentForums"], 
            queryFn: async () => {
              const response = await axiosPublic.get("/forums/recent"); // Fetch from backend
              //console.log(response.data); // Debugging: log data from API
              return response.data; // Return the forums array
            },
          });
        
          if (isLoading) {
            return <LoadingSpinner />; // Show spinner while loading
          }
        
          if (isError) {
            return (
              <p className="text-center text-red-500">
                Error fetching forums: {error.message}
              </p>
            );
          }

  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Discover Our Latest News</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forums.map((forum) => (
            <div
              key={forum._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={forum.image}
                alt={forum.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
              <div className="flex items-center">
                  <img
                    src={forum.createdBy.userImage}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium">Olivia Rodrigo</p>
                    <p className="text-xs text-gray-500 flex  items-center gap-2">
                      <FaCalendar></FaCalendar> {new Date(forum.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                {forum.title.length > 20
                    ? `${forum.title.substring(0, 20)}...`
                    : forum.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {forum.details.length > 100
                    ? `${forum.details.substring(0, 100)}...`
                    : forum.details}
                </p>
                
                <Link className="border-b-2">
                Read More
                </Link>
                
                
               
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentForums;
