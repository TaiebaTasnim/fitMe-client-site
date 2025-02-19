import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Helmet } from "react-helmet";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("none");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["classes", searchQuery, currentPage, sortOrder],
    queryFn: async () => {
      const res = await axiosPublic.get("/classes", {
        params: {
          search: searchQuery,
          page: currentPage,
          limit: 5,
          sort: sortOrder,
        },
      });
      
      return res.data;
    },
    keepPreviousData: true,
  });

  
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="bg-gray-100 dark:bg-black pt-32 pb-16 dark:pb-0">
      <Helmet><title>FitMe | All Classes</title></Helmet>
      <h1 className="text-3xl font-bold text-center mb-6 text-[#abc502]">All Classes</h1>
      <div className="w-36 h-[2px] mx-auto bg-[#abc502] mb-8"></div>

      {/* Search & Sorting */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          placeholder="Search by class name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-[50%] p-2 border border-gray-300 rounded-md dark:border-black dark:border-2"
        />

        {/* Sorting Dropdown */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border border-gray-300 rounded-md dark:border-black dark:border-2"
        >
          <option value="none">Sort by Booking</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto w-[90%] px-4">
        {data?.classes?.length > 0 ? (
          data.classes.map((classItem) => (
            <div key={classItem._id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full dark:border-[#abc502] dark:border-2">
              <img src={classItem.class_image} alt={classItem.class_name} className="w-full h-72 object-cover" />
              <div className="p-6 flex-grow">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{classItem.class_name}</h2>
                  <p className="text-gray-700 text-sm">Booking: {classItem.bookingCount}</p>
                </div>
                <p className="text-gray-600 mb-4">
                  {classItem.class_details.length > 50 ? `${classItem.class_details.substring(0, 50)}...` : classItem.class_details}
                </p>
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Trainers</h3>
                  <div className="flex items-center space-x-3">
                    {classItem.trainers.length > 0 ? (
                      classItem.trainers.map((trainer, index) => (
                        <Link key={index} to={`/trainerDetails/${trainer._id}`}>
                          <img src={trainer.profile_image} alt={trainer.full_name} className="w-10 h-10 rounded-full border-2 border-gray-200" />
                          <ReactTooltip id={`tooltip-${trainer._id}`} place="bottom" effect="solid" content={trainer.full_name} />
                        </Link>
                      ))
                    ) : (
                      <p className="text-sm text-gray-700">No Trainers Available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-700">No classes available.</div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={data?.currentPage === 1} className="px-4 py-2 bg-[#abc502] text-black rounded-md mr-2">
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">Page {data?.currentPage} of {data?.totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, data?.totalPages))} disabled={data?.currentPage === data?.totalPages} className="px-4 py-2 bg-[#abc502] text-black rounded-md ml-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default AllClasses;
