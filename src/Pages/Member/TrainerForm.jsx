import { useContext, useRef, useState } from "react";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { imageUpload } from "../../api/utils";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

export const TrainerForm = () => {
  const formRef = useRef(null);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    full_name: "",
    email: user?.email || "",
    age: "",
    skills: [],
    slot_name: "",
    available_days: [],
    available_time: { start: "", end: "" },
    years_of_experience: "",
    biography: "",
    facebook_profile: "",
    instagram_profile: "",
  });

  const daysOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
  ];

  

  const mutation = useMutation({
    mutationFn: async (trainerData) => {
      const response = await axiosSecure.post("/trainers", trainerData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
      toast.success("Trainer request saved successfully!");
      setFormData({
        full_name: "",
        email: user?.email || "",
        age: "",
        skills: [],
        slot_name: "",
        available_days: [],
        available_time: { start: "", end: "" },
        years_of_experience: "",
        biography: "",
        facebook_profile: "",
        instagram_profile: "",
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("An error occurred while saving data.");
    },
  });
  const { data: skills = [], isLoading } = useQuery({
      queryKey: ["skills"],
      queryFn: async () => {
        const res = await axiosSecure.get("/class-names");
        return res.data;
      },
    });
  
    if (isLoading) return <LoadingSpinner />;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selected) => {
    setFormData({ ...formData, available_days: selected.map((day) => day.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageFile = e.target.profile_image.files[0];
    let photoURL = "";

    // Upload profile image
    if (imageFile) {
      photoURL = await imageUpload(imageFile);
    }

    // Generate slots array
    const slots = formData.available_days.map((day) => ({
      slot_name: formData.slot_name,
      available_day: day,
      available_time: { ...formData.available_time },
      class_name:formData.skills
    }));

    // Prepare final trainer data structure
    const trainerData = {
      full_name: formData.full_name,
      email: formData.email,
      age: formData.age,
      skills: formData.skills,
      slots, // Array of slots
      years_of_experience: formData.years_of_experience,
      biography: formData.biography,
      facebook_profile: formData.facebook_profile,
      instagram_profile: formData.instagram_profile,
      profile_image: photoURL,
    };

    mutation.mutate(trainerData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="bg-white shadow-2xl my-6 rounded-lg p-8 w-full max-w-4xl"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-8">
          Be a Trainer
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-600 mb-1">
              Full Name*
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>
            {/* Age */}
            <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Age*
            </label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#abc502]"
            />
          </div>
          
          {/* Profile Image */}
          <div>
            <label
              htmlFor="profile_image"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Upload Profile Image*
            </label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              accept="image/*"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#abc502]"
            />
          </div>
           {/* Skills */}
<div className="col-span-2">
  <label
    className="block text-sm font-medium text-gray-600 mb-2"
    htmlFor="skills"
  >
    Skills*
  </label>
  <div className="grid grid-cols-3 gap-4">
    {skills.map((skill) => (
      <label key={skill._id} className="inline-flex items-center">
        <input
        
          type="checkbox"
          name="skills"
          value={skill.class_name}
          onChange={(e) => {
            if (e.target.checked) {
              setFormData((prevData) => ({
                ...prevData,
                skills: [...prevData.skills, skill.class_name],
              }));
            } else {
              setFormData((prevData) => ({
                ...prevData,
                skills: prevData.skills.filter(
                  (selectedSkill) => selectedSkill !== skill.class_name
                ),
              }));
            }
          }}
          
          className="form-checkbox h-5 w-5 text-[#abc502] rounded"
        />
        <span className="ml-2 text-gray-700">{skill.class_name}</span>
      </label>
    ))}
  </div>
</div>


          {/* Slot Name */}
          <div>
            <label htmlFor="slot_name" className="block text-sm font-medium text-gray-600 mb-1">
              Slot Name*
            </label>
            <input
              type="text"
              id="slot_name"
              name="slot_name"
              value={formData.slot_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Available Days */}
          <div className="col-span-2">
            <label htmlFor="available_days" className="block text-sm font-medium text-gray-600 mb-1">
              Available Days*
            </label>
            <Select
              isMulti
              options={daysOptions}
              onChange={handleSelectChange}
              required
            />
          </div>

          {/* Available Time */}
          <div>
            <label htmlFor="start_time" className="block text-sm font-medium text-gray-600 mb-1">
              Start Time*
            </label>
            <input
              type="time"
              id="start_time"
              name="start"
              value={formData.available_time.start}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  available_time: { ...formData.available_time, start: e.target.value },
                })
              }
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="end_time" className="block text-sm font-medium text-gray-600 mb-1">
              End Time*
            </label>
            <input
              type="time"
              id="end_time"
              name="end"
              value={formData.available_time.end}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  available_time: { ...formData.available_time, end: e.target.value },
                })
              }
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
            {/* Years of Experience */}
            <div>
            <label
              htmlFor="years_of_experience"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Experience (Years)*
            </label>
            <input
              type="number"
              id="years_of_experience"
              name="years_of_experience"
              value={formData.years_of_experience}
              onChange={handleInputChange}
              required
              className="w-full focus:ring-[#abc502] px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
           {/* Facebook Profile */}
           <div>
            <label htmlFor="facebook_profile" className="block text-sm font-medium text-gray-600 mb-1">
              Facebook Profile
            </label>
            <input
              type="url"
              id="facebook_profile"
              name="facebook_profile"
              value={formData.facebook_profile}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Instagram Profile */}
          <div>
            <label htmlFor="instagram_profile" className="block text-sm font-medium text-gray-600 mb-1">
              Instagram Profile
            </label>
            <input
              type="url"
              id="instagram_profile"
              name="instagram_profile"
              value={formData.instagram_profile}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

          {/* Biography */}
          <div className="col-span-2">
            <label htmlFor="biography" className="block text-sm font-medium text-gray-600 mb-1">
              Biography*
            </label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>

         

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-lg"
          >
            {mutation.isLoading ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
