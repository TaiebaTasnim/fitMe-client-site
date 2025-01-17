import { useContext, useState } from "react";
import Select from "react-select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

export const TrainerForm = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "", // Pre-filled and read-only
    age: "",
    profile_image: "",
    skills: [],
    available_days: [],
    available_time: { start: "", end: "" },
    years_of_experience: "",
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
      console.log(res.data)
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const trainerData = {
      ...formData,
    };

    mutation.mutate(trainerData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Full Name:</label>
      <input
        type="text"
        name="full_name"
        value={formData.full_name}
        onChange={handleInputChange}
        required
      />

      <label>Email (read-only):</label>
      <input type="email" name="email" value={user?.email} readOnly />

      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleInputChange}
        required
      />

      <label>Profile Image URL:</label>
      <input
        type="url"
        name="profile_image"
        value={formData.profile_image}
        onChange={handleInputChange}
        required
      />

      <label>Skills:</label>
      <Select
        isMulti
        name="skills"
        options={skills.map((skill) => ({ value: skill.name, label: skill.name }))}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(selected) => handleSelectChange(selected, "skills")}
      />

      <label>Available Days:</label>
      <Select
        isMulti
        options={daysOptions}
        onChange={(selected) => handleSelectChange(selected, "available_days")}
      />

      <label>Available Time:</label>
      <div>
        <label>Start:</label>
        <input
          type="time"
          name="start"
          value={formData.available_time.start}
          onChange={(e) =>
            setFormData({
              ...formData,
              available_time: { ...formData.available_time, start: e.target.value },
            })
          }
          required
        />
        <label>End:</label>
        <input
          type="time"
          name="end"
          value={formData.available_time.end}
          onChange={(e) =>
            setFormData({
              ...formData,
              available_time: { ...formData.available_time, end: e.target.value },
            })
          }
          required
        />
      </div>

      <label>Years of Experience:</label>
      <input
        type="number"
        name="years_of_experience"
        value={formData.years_of_experience}
        onChange={handleInputChange}
        required
      />

      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};
