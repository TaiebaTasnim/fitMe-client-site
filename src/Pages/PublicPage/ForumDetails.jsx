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
    <div className="bg-gray-100 dark:bg-black pt-32 pb-16 dark:pb-0">
      <Helmet><title>FitMe | Post Details</title></Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 text-[#abc502]">Details of the forum</h1>
      <div className="w-36 h-[2px] mx-auto bg-[#abc502] mb-8 text-center"></div>
       <div className="container mx-auto w-[90%]">
       <div className="w-full h-96 relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={forum.image}
          alt={forum.title}
          className="w-full h-full object-cover dark:border-[#abc502] border-2"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h1 className="text-2xl text-center md:text-4xl text-white font-bold">{forum.title}</h1>
        </div>
      </div>

      {/* Forum Details */}
      <div className="mt-8  rounded-lg shadow-lg dark:py-6 dark:px-0  p-6 overflow-hidden">
        {/* User Info */}
        <div className="flex items-center mb-4">
          
          <div className="">
            <p className="font-bold text-gray-800 dark:text-white">
              Created by: {forum.createdBy.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">Details</h2>
          <p className="text-gray-600 leading-relaxed dark:text-gray-400">{forum.details}</p>
        </div>

        {/* Voting Count */}
        <div className="mt-6">
          <p className="text-lg text-gray-700 dark:text-white">
            <strong>Vote:</strong> {forum.votingCount}
          </p>
        </div>
      </div>
       </div>
      
      
    </div>
  );
};

export default ForumDetails;

