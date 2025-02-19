import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Helmet } from "react-helmet";



const AllClasses = () => {
  const axiosPublic = useAxiosPublic();

  const [searchQuery, setSearchQuery] = useState(""); // To hold the search query
  const [currentPage, setCurrentPage] = useState(1);  // Current page state
  //const [searchClicked, setSearchClicked] = useState(false); // Track if search button was clicked

  // Fetch classes with search and pagination
  const { data, isLoading, isError } = useQuery({
    queryKey: ['classes', searchQuery, currentPage], // Querying by search term and page
    queryFn: async () => {
      const res = await axiosPublic.get("/classes", {
        params: {
          search: searchQuery,   // The search query from the input
          page: currentPage,     // The current page to fetch
          limit: 5,              // Limit of 5 classes per page
        },
      });
      console.log(res.data)
      return res.data;
    },
    keepPreviousData: true, // Keep the previous page's data while new data is fetched
    //enabled: searchClicked, // Only enable the query if search button was clicked
  });

//   const handleSearch = () => {
//     //setSearchClicked(true); // Mark that the search button was clicked
//     //setCurrentPage(1); // Reset to page 1 when a new search is performed
//   };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="bg-gray-100 dark:bg-black pt-32 pb-16 dark:pb-0">
      <Helmet><title>FitMe | All Classes</title></Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 text-[#abc502]">All Classes</h1>
      <div className="w-36 h-[2px] mx-auto bg-[#abc502] mb-8 text-center"></div>

      {/* Search Bar and Button */}
      <div className="mb-8 flex items-center justify-center">
        <input
          type="text"
          placeholder="Search by class name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);  // Update search query
            setCurrentPage(1);  // Reset to the first page on search
          }}
         
          //onClick={handleSearch} // Update search query on typing
          className=" w-full md:w-[50%]  p-2 border border-gray-300 rounded-md dark:border-black dark:border-2"
        />
       
        {/* <button
          // Only trigger search when button is clicked
          className="ml-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button> */}
      </div>

      {/* Classes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  container mx-auto w-[90%] px-4">
        {data?.classes?.length > 0 ? (
          data.classes.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300  flex flex-col h-full dark:border-[#abc502] dark:border-2"
            >
              <img
                src={classItem.class_image}
                alt={classItem.class_name}
                className="w-full h-72 object-cover"
              />
              <div className="p-6 flex-grow">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{classItem.class_name}</h2>
                  <p className="text-gray-700 text-sm">Booking: {classItem.bookingCount}</p>
                </div>
                <p className="text-gray-600 mb-4">
                {classItem.class_details.length > 50
                    ? `${classItem.class_details.substring(0, 50)}...`
                    : classItem.class_details}
                  </p>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Trainers who took this class</h3>
                  <div className="flex items-center space-x-3">
                    {classItem.trainers.length > 0 ? (
                      classItem.trainers.map((trainer, index) => (
                        <Link key={index} to={`/trainerDetails/${trainer._id}`}>
                         <div  className="relative"
                  data-tooltip-id={`tooltip-${classItem.class_name}`}
                  data-tooltip-content={trainer.full_name}
                  style={{
                    display: "inline-block",
                    position: "relative",
                  }}>
                          <img
                            src={trainer.
                              profile_image}
                            alt={trainer.full_name}
                            className="w-10 h-10 rounded-full border-2 border-gray-200"
                            style={{
                              position: "relative",
                              zIndex: 1, // To ensure the image is above the tooltip
                            }}/>
                          <ReactTooltip id={`tooltip-${classItem.class_name}`} place="bottom" effect="solid"  style={{
                    backgroundColor: "#abc502",
                    color: "black",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "12px",
                    position: "absolute",
                    //transform: "translateY(-1px)", // Moves tooltip upwards
                    zIndex: 10,
                    whiteSpace: "nowrap",
                  }} />
                          
                          
                        </div>
                        </Link>
                       
                      ))
                    ) : (
                      <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-400 mb-2">No Trainers Available yet.</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-700 dark:text-gray-400">
            {searchQuery ? "No classes found for this search on this page." : "No classes available."}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={data?.currentPage === 1}
          className="px-4 py-2 bg-[#abc502] text-black rounded-md mr-2"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700 dark:text-gray-400">
          Page {data?.currentPage} of {data?.totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.totalPages))}
          disabled={data?.currentPage === data?.totalPages}
          className="px-4 py-2 bg-[#abc502] text-black rounded-md ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllClasses;
