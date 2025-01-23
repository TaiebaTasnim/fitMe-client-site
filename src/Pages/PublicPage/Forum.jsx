import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaArrowAltCircleDown, FaArrowAltCircleUp, FaCalendar } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { SiTrainerroad } from "react-icons/si";
import { useContext, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";





const Forum = () => {
      const {user}=useContext(AuthContext)
      const axiosPublic=useAxiosPublic()
      const [votedForums, setVotedForums] = useState({}); 
      const { data: forums = [], isLoading, isError, error,refetch } = useQuery({
            queryKey: ["forums"], 
            queryFn: async () => {
              const response = await axiosPublic.get("/forums"); // Fetch from backend
              //console.log(response.data); // Debugging: log data from API
              return response.data; // Return the forums array
            },
          });

          const handleNonUserVote=async()=>{
            toast.error("log in first")
          }

          const handleVote = async (forumId, action) => {
           
                  try {
                        const response = await axiosPublic.patch(`/forums/vote`, {
                          forumId,
                          action
                        });
                  
                        
                        refetch()
                        setVotedForums((prevState) => ({
                            ...prevState,
                            [forumId]: action // Track the vote action (upvote or downvote)
                          }));
                  
                        
                        console.log(response.data); // Log the updated forum details
                      } catch (error) {
                        console.error("Error voting:", error);
                      }
                  
           

            


            }
            
        
        
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
              <div className=" ">
              <div className="flex p-4 justify-between items-center">
                  <div className="flex justify-between items-center">
                  <img
                    src={forum.createdBy.userImage}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div>
                  <p className="text-sm font-medium">Olivia Rodrigo</p>
                    {
                        forum.createdBy.role==='admin'&& <div className="flex items-center gap-2"><MdAdminPanelSettings className="text-[#abc502]"></MdAdminPanelSettings>Admin</div>
                    }
                    {
                        forum.createdBy.role==='trainer' && <div className="flex items-center gap-2"><SiTrainerroad></SiTrainerroad>Trainer</div>
                    }

                  </div>
                 
                   

                  </div>
                  
                    <div>
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
                
                
                
                
               
              </div>
              <div className="p-4 flex items-center gap-2  ">
            {
                  user ? <div className="flex items-center gap-2"><FaArrowAltCircleUp onClick={() => handleVote(forum._id, 'upvote')} className={`text-xl ${votedForums[forum._id] === 'upvote' ? 'text-[#abc502]' : ''}`}></FaArrowAltCircleUp> 
                  UpVote: {forum.votingCount}
                  
                 
                 
                  <FaArrowAltCircleDown  onClick={() => handleVote(forum._id, 'downvote')} className={`text-xl ${votedForums[forum._id] === 'downvote' ? 'text-[#abc502]' : ''}`}></FaArrowAltCircleDown></div>
                  : <div className="flex items-center gap-2"><FaArrowAltCircleUp onClick={handleNonUserVote} ></FaArrowAltCircleUp> 
                     UpVote: {forum.votingCount}
                     
                    
                    
                     <FaArrowAltCircleDown onClick={handleNonUserVote} ></FaArrowAltCircleDown></div>
            }
              
               
              
             
              
          
           
          
      
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
           
      );
};

export default Forum;