import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
//import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiTrainerroad } from "react-icons/si";

const ForumDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { forumId } = useParams(); // Get forum ID from URL parameters
  console.log(forumId);

  // Fetch the specific forum details
  const { data: forum=[], isLoading, isError, error } = useQuery({
    queryKey: ["forum", forumId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/forums1/${forumId}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto w-[90%] my-10 p-6">
      <Helmet><title>FitMe | Post Details</title></Helmet>
      {/* Banner Image */}
      <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={forum.image}
          alt={forum.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-2xl text-center md:text-4xl text-white font-bold">{forum.title}</h1>
        </div>
      </div>

      {/* Forum Details */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        {/* User Info */}
        <div className="flex items-center mb-4">
          
          <div className="">
            <p className="font-bold text-gray-800">
              Created by: {forum.createdBy.email}
            </p>
            <p className="text-sm text-gray-500">
              {forum.createdBy.role === "admin" && (
                                    <div className="flex items-center gap-2">
                                      <MdAdminPanelSettings className="text-[#abc502]" /> Admin • {new Date(forum.createdAt).toLocaleDateString()}
                                    </div>
                                  )}
                                  {forum.createdBy.role === "trainer" && (
                                    <div className="flex items-center gap-2">
                                      <SiTrainerroad className="text-[#abc502]"  /> Trainer • {new Date(forum.createdAt).toLocaleDateString()}
                                    </div>
                                  )} 
            </p>
          </div>
        </div>

        {/* Forum Content */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Details</h2>
          <p className="text-gray-600 leading-relaxed">{forum.details}</p>
        </div>

        {/* Voting Count */}
        <div className="mt-6">
          <p className="text-lg text-gray-700">
            <strong>Vote:</strong> {forum.votingCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForumDetails;

