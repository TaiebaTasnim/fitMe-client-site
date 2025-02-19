import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaCalendar } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiTrainerroad } from "react-icons/si";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const Forum = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [votedForums, setVotedForums] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // Number of items per page

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["forums", page], // Refetch when page changes
    queryFn: async () => {
      const response = await axiosPublic.get(`/forums?page=${page}&limit=${limit}`);
      return response.data; // Contains forums, totalPages, and currentPage
    },
    keepPreviousData: true, // Keep previous data during fetching
  });

  const handleNonUserVote = async () => {
    toast.error("Please log in first");
  };

  const handleVote = async (forumId, action) => {
    try {
      const response = await axiosSecure.patch(`/forums/vote`, { forumId, action });
      refetch();
      setVotedForums((prevState) => ({
        ...prevState,
        [forumId]: action, // Track the vote action (upvote or downvote)
      }));
      console.log(response.data);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">Error fetching forums: {error.message}</p>
    );
  }

  const { forums, totalPages, currentPage } = data;

  return (
    <div className="bg-gray-100  dark:bg-black pt-32 pb-16 dark:pb-0">
      <Helmet><title>FitMe | All Posts</title></Helmet>
      <div className=" container mx-auto w-[90%]  px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#abc502]">Discover Our Latest News</h2>
        <div className="w-36 h-[2px] mx-auto bg-[#abc502] mb-8 text-center"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forums.map((forum) => (
            <div key={forum._id} className="bg-white shadow-lg rounded-lg overflow-hidden dark:border-[#abc502] dark:border-2">
              <img src={forum.image} alt={forum.title} className="w-full h-48 object-cover" />
              <div className="flex p-4 justify-between items-center">
                <div className="flex items-center">
                  <img
                    src={forum.createdBy.userImage}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium">{forum.createdBy.name}</p>
                    {forum.createdBy.role === "admin" && (
                      <div className="flex items-center gap-2">
                        <MdAdminPanelSettings className="text-[#abc502]" /> Admin
                      </div>
                    )}
                    {forum.createdBy.role === "trainer" && (
                      <div className="flex items-center gap-2">
                        <SiTrainerroad className="text-[#abc502]" /> Trainer
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500 flex items-center gap-2">
                  <FaCalendar /> {new Date(forum.createdAt).toLocaleDateString()}
                </p>
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
              </div>
              <div className="p-4 flex items-center gap-2">
                {user ? (
                  <div className="flex items-center gap-2">
                    <FaArrowAltCircleUp
                      onClick={() => handleVote(forum._id, "upvote")}
                      className={`text-xl ${
                        votedForums[forum._id] === "upvote" ? "text-[#abc502]" : ""
                      }`}
                    />
                    UpVote: {forum.votingCount}
                    <FaArrowAltCircleDown
                      onClick={() => handleVote(forum._id, "downvote")}
                      className={`text-xl ${
                        votedForums[forum._id] === "downvote" ? "text-[#abc502]" : ""
                      }`}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FaArrowAltCircleUp onClick={handleNonUserVote} />
                    UpVote: {forum.votingCount}
                    <FaArrowAltCircleDown onClick={handleNonUserVote} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-[#abc502] text-black rounded disabled:opacity-50"
          >
            Previous
          </button>
          <p className="mx-4 text-[#abc502]">
            Page {currentPage} of {totalPages}
          </p>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-[#abc502] text-black rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forum;
