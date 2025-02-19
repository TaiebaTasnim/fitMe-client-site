import { useContext, useState  } from "react";
import Select from "react-select";

import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { Helmet } from "react-helmet";
//import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddNewSlot = () => {
      const {user}=useContext(AuthContext)
      const axiosSecure=useAxiosSecure()
     // const axiosPublic=useAxiosPublic()
  
 
  const [formData, setFormData] = useState({
    slot_name: "",
    available_time_start: "",
    available_time_end: "",
    days: [],
    class_name: "",
  });

   // Predefined day options
   const dayOptions = [
      { value: "Monday", label: "Monday" },
      { value: "Tuesday", label: "Tuesday" },
      { value: "Wednesday", label: "Wednesday" },
      { value: "Thursday", label: "Thursday" },
      { value: "Friday", label: "Friday" },
      { value: "Saturday", label: "Saturday" },
      { value: "Sunday", label: "Sunday" },
    ];

//   const { data: trainerData={}, isLoading, isError, error, refetch } = useQuery({
//       queryKey: ["trainerData", user?.email],
//       queryFn: async () => {
//         const response = await axiosSecure.get(/trainers3/${user?.email});
//         return response.data;
//       },
//     });
    const { data: trainerData={}, isLoading, isError, error, refetch } = useQuery({
      queryKey: ["trainerData", user?.email],
      queryFn: async () => {
        const response = await axiosSecure.get(`/trainers5/${user?.email}`);
       
        return response.data;
      },
    });

  // Fetch class names from classNames collection
  const { data: classes = [] } = useQuery({
      queryKey: ["classes"],
      queryFn: async () => {
        const res = await axiosSecure.get("/class-names");
        return res.data;
      }
    });

    const formattedClasses = classes.map((cls) => ({
      value: cls.class_name,
      label: cls.class_name,

    }));

  if (isLoading) return <LoadingSpinner/>;
  if (isError) return <p>Error: {error.message}</p>;

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle multi-select change
  const handleSelectChange = (selectedOptions) => {
    setFormData({ ...formData, days: selectedOptions.map((option) => option.value) });
  };

  const handleClassSelectChange = (selectedOption) => {
     console.log(selectedOption)
      setFormData({
        ...formData,
        class_name: selectedOption ? selectedOption.value : "", 
      });
    };
    

    const newSkills = formData.class_name ? [...trainerData.skills, formData.class_name] : trainerData.skills;

    console.log(newSkills)

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

//     if (!trainerData || trainerData.status !== "verified") {
//       Swal.fire("Error", "You are not a verified trainer!", "error");
//       return;
//     }
const slots = formData.days.map((day) => ({
      slot_name: formData.slot_name,
      available_day: day,
      available_time: {
            start: formData.available_time_start,
            end: formData.available_time_end,
          },
          class_name:formData.class_name
    }));


    const payload = {
      slots, // For updating slots
     skills :newSkills
    };
     console.log(payload)

    
     axiosSecure.patch(`/add-slot/${user?.email}`,  payload )
      .then(() => {
        Swal.fire("Success", "Slot added successfully!", "success");
        refetch()
      })
      .catch(() => {
        Swal.fire("Error", "Failed to add slot!", "error");
      });
  };

  return (
    <div className="p-6 bg-gray-100  rounded-md shadow-md mt-6 lg:mt-0">
      <Helmet><title>FitMe | Add Slots</title></Helmet>
      {trainerData?.email ? (
        <form onSubmit={handleSubmit}>
          {/* Display read-only trainer info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-600 mb-1">Name</label>
              <input
                type="text"
                
                value={trainerData.full_name}
                className="w-full px-4 py-2 border rounded-lg"
                readOnly
              />
            </div>
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg"
                value={trainerData.email}
                readOnly
              />
            </div>
            <div >
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-600 mb-1">Skills</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg"
                value={trainerData.skills.join(", ")}
                readOnly
              />
            </div>
            {/* Age */}
            <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Age
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={trainerData.age}
              readOnly
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#abc502]"
            />
          </div>
          <div >
            <label  htmlFor="full_name" className="block text-sm font-medium text-gray-600 mb-1">Slot Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              name="slot_name"
              value={trainerData.slots[0].slot_name}
             readOnly
            />
          </div>
          <div>
            <label
              htmlFor="years_of_experience"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Experience (Years)
            </label>
            <input
              type="number"
              
              value={trainerData.years_of_experience}
              onChange={handleInputChange}
             readOnly
              className="w-full focus:ring-[#abc502] px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="">
  <label>Available Days</label>
  <Select
    isMulti
    options={dayOptions}
    value={trainerData.slots.map(slot => ({
      label: slot.available_day,
      value: slot.available_day
    }))}
    isDisabled={true}  // Read-only
  />
</div>
          

            
            {/* <div>
              <label>Status</label>
              <input
                type="text"
                className="input"
                value={trainerData.status}
                readOnly
              />
            </div> */}
          </div>
           <hr className="border-2 mt-6"></hr>
          {/* Slot Details */}
          <div className="mt-6">
            <label  htmlFor="full_name" className="block text-sm font-medium text-gray-600 mb-1">Slot Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              name="slot_name"
             
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mt-4 z-10">
            <label>Available Days</label>
            <Select isMulti options={dayOptions} onChange={handleSelectChange} />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label>Start Time</label>
              <input
                type="time"
                className="input"
                name="available_time_start"
                value={formData.available_time_start}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>End Time</label>
              <input
                type="time"
                className="input"
                name="available_time_end"
                value={formData.available_time_end}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label>Skills</label>
            <Select
              options={formattedClasses}
              onChange={handleClassSelectChange} 
              required
            />
          </div>

          <div className="mt-6 text-right">
            <button type="submit" className="px-6 py-2 bg-[#abc502] text-black font-medium rounded-lg">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <p>Loading trainer data...</p>
      )}
    </div>
  );
};

export default AddNewSlot;