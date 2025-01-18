import { useContext, useRef, useState } from "react";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { imageUpload } from "../../api/utils";

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
    available_days: [],
    available_time: { start: "", end: "" },
    years_of_experience: "",
    biography: "",
    facebook_profile: "",
    instagram_profile: "",
  });

  const daysOptions = [
    { value: "Sun", label: "Sunday" },
    { value: "Mon", label: "Monday" },
    { value: "Tue", label: "Tuesday" },
    { value: "Wed", label: "Wednesday" },
    { value: "Thu", label: "Thursday" },
    { value: "Fri", label: "Friday" },
    { value: "Sat", label: "Saturday" },
  ];

  const mutation = useMutation({
    mutationFn: async (trainerData) => {
      const response = await axiosSecure.post("/trainers", trainerData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trainers"] });
      toast.success("Trainer data saved successfully!");
      setFormData({
            full_name: "",
            email: user?.email || "",
            age: "",
            skills: [],
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

  const handleSelectChange = (selected, name) => {
    setFormData({ ...formData, [name]: selected.map((item) => item.value) });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const imageFile = e.target.profile_image.files[0];
    let photoURL = "";

    // Upload image to external service
    if (imageFile) {
      photoURL = await imageUpload(imageFile);
    }
    const trainerData = {
      ...formData,
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
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Name*
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#abc502]"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              
              value={formData.email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
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
          value={skill.name}
          onChange={(e) => {
            if (e.target.checked) {
              setFormData((prevData) => ({
                ...prevData,
                skills: [...prevData.skills, skill.name],
              }));
            } else {
              setFormData((prevData) => ({
                ...prevData,
                skills: prevData.skills.filter(
                  (selectedSkill) => selectedSkill !== skill.name
                ),
              }));
            }
          }}
          
          className="form-checkbox h-5 w-5 text-[#abc502] rounded"
        />
        <span className="ml-2 text-gray-700">{skill.name}</span>
      </label>
    ))}
  </div>
</div>


          {/* Available Days */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="available_days"
            >
              Available Days*
            </label>
            <Select
            required
              isMulti
              options={daysOptions}
              onChange={(selected) =>
                handleSelectChange(selected, "available_days")
              }
            />
          </div>

          {/* Available Time */}
          <div>
            <label
              className="block text-sm font-medium text-gray-600 mb-1"
              htmlFor="available_time"
            >
              Available Time*
            </label>
            <div className="flex items-center gap-4">
              <div>
                <label
                  htmlFor="start_time"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Start
                </label>
                <input
                
                  type="time"
                  id="start_time"
                  name="start"
                  value={formData.available_time.start}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      available_time: {
                        ...formData.available_time,
                        start: e.target.value,
                      },
                    })
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="end_time"
                  className="block text-xs text-gray-500 mb-1"
                >
                  End
                </label>
                <input
                  type="time"
                  id="end_time"
                  name="end"
                  value={formData.available_time.end}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      available_time: {
                        ...formData.available_time,
                        end: e.target.value,
                      },
                    })
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg  focus:outline-none"
                />
              </div>
            </div>
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
            <label
              htmlFor="facebook_profile"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Facebook Profile Link
            </label>
            <input
              type="url"
              id="facebook_profile"
              name="facebook_profile"
              value={formData.facebook_profile}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#abc502]"
            />
          </div>

          {/* Instagram Profile */}
          <div>
            <label
              htmlFor="instagram_profile"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Instagram Profile Link
            </label>
            <input
              type="url"
              id="instagram_profile"
              name="instagram_profile"
              value={formData.instagram_profile}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#abc502]"
            />
          </div>

          {/* Biography */}
          <div className="col-span-2">
            <label
              htmlFor="biography"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Biography
            </label>
            <textarea
              id="biography"
              name="biography"
              value={formData.biography}
              onChange={handleInputChange}
              rows="4"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#abc502]"
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-right">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="px-6 py-2 bg-[#abc502] text-black font-medium rounded-lg hover:bg-black hover:text-white focus:ring-[#abc502]  focus:outline-none"
          >
            {mutation.isLoading ? "Saving..." : "Apply"}
          </button>
        </div>
      </form>
    </div>
  );
};
