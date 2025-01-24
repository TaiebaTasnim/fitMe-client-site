import  { useContext} from "react";
import { useQuery } from "@tanstack/react-query";

import { FaTrash } from "react-icons/fa"; // You can use any delete icon you prefer
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import Swal from "sweetalert2";
//import Swal from "sweetalert2";

const ManageSlots = () => {
      const {user}=useContext(AuthContext)
      const axiosSecure=useAxiosSecure()
      const { data: slots = [], isLoading, isError, error,refetch } = useQuery({
            queryKey: ["manageSlots", user?.email], // queryKey with email for uniqueness
            queryFn: async () => {
              const response = await axiosSecure.get(`/manage-slots?email=${user?.email}`);
              console.log(response.data)
              return response.data.slots; // Assuming response contains the 'slots' array
            },
            enabled: !!user?.email, // The query runs only when email is available
          });

  const handleDelete = (slotIndex,trainerEmail) => {
      //console.log(slotIndex)
      Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              // Send DELETE request to backend
              axiosSecure
                .delete(`/manage-slots/${trainerEmail}/${slotIndex}`)
                .then(() => {
                  // On success, show SweetAlert success message
                  Swal.fire("Deleted!", "Your slot has been deleted.", "success");
                  // Refetch the slots after deletion
                  refetch()
                })
                .catch((error) => {
                  // Handle error if deletion fails
                  console.error("Error deleting slot:", error);
                  Swal.fire("Error", "There was a problem deleting the slot.", "error");
                });
            }
          });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Manage Slots</h2>
      <table className="table-auto w-full bg-white rounded-lg shadow-lg">
        <thead className="bg-[#abc502] text-white">
          <tr>
            <th className="px-4 py-2">Day</th>
            <th className="px-4 py-2">Slot Name</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Skills</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"} hover:bg-gray-300 transition duration-300`}
            >
              <td className="px-4 py-2">{slot.available_day}</td>
              <td className="px-4 py-2">{slot.slot_name}</td>
              <td className="px-4 py-2">
                {slot.available_time.start} - {slot.available_time.end}
              </td>
             
              <td className="px-4 py-2">{slot.class_name}</td>
              <td className="px-4 py-2">{slot.status}</td>
              <td className="px-4 py-2 text-center">
                {slot.status === "available" && (
                  <button
                    onClick={() => handleDelete(index,slot.trainerData.email)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSlots;
