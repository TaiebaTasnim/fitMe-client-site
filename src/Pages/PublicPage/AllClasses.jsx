import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

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
      return res.data;
    },
    keepPreviousData: true, // Keep the previous page's data while new data is fetched
    //enabled: searchClicked, // Only enable the query if search button was clicked
  });

  const handleSearch = () => {
    //setSearchClicked(true); // Mark that the search button was clicked
    setCurrentPage(1); // Reset to page 1 when a new search is performed
  };

  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">All Classes</h1>

      {/* Search Bar and Button */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by class name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on typing
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch} // Only trigger search when button is clicked
          className="ml-4 p-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>

      {/* Classes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.classes?.length > 0 ? (
          data.classes.map((classItem) => (
            <div
              key={classItem._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={classItem.class_image}
                alt={classItem.class_name}
                className="w-full h-72 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{classItem.class_name}</h2>
                  <p className="text-gray-700 text-sm">Booking: {classItem.bookingCount}</p>
                </div>
                <p className="text-gray-600 mb-4">{classItem.class_details}</p>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Trainers who took this class</h3>
                  <div className="flex items-center space-x-3">
                    {classItem.trainers.length > 0 ? (
                      classItem.trainers.map((trainer, index) => (
                        <div key={index} className="relative">
                          <img
                            src={trainer.image}
                            alt={trainer.name}
                            className="w-10 h-10 rounded-full border-2 border-gray-200"
                          />
                          <span className="sr-only">{trainer.name}</span>
                        </div>
                      ))
                    ) : (
                      <h1 className="text-sm font-semibold text-gray-700 mb-2">No Trainers Available yet.</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-700">
            {searchQuery ? "No classes found for this search on this page." : "No classes available."}
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={data?.currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {data?.currentPage} of {data?.totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.totalPages))}
          disabled={data?.currentPage === data?.totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllClasses;
