import  { useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddClassForm = () => {
  const formRef = useRef(null); // Reference to reset the form
  const axiosSecure=useAxiosSecure()

  const addClassMutation = useMutation({
    mutationFn: async (classData) => {
      const response = await axiosSecure.post("/classes", classData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Class added successfully!");
      if (formRef.current) {
        formRef.current.reset(); // Reset the form fields after success
      }
    },
    onError: (error) => {
      console.error("Error adding class:", error.message);
      toast.error("Failed to add class.");
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const classData = {
      class_name: event.target.class_name.value,
      class_image: event.target.class_image.value,
      class_details: event.target.class_details.value,
    };

    addClassMutation.mutate(classData);
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <input
        type="text"
        name="class_name"
        placeholder="Class Name"
        required
      />
      <input
        type="text"
        name="class_image"
        placeholder="Class Image URL"
        required
      />
      <textarea
        name="class_details"
        placeholder="Class Details"
        rows="4"
        required
      ></textarea>

      <button type="submit" disabled={addClassMutation.isLoading}>
        {addClassMutation.isLoading ? "Saving..." : "Save Class"}
      </button>
    </form>
  );
};

export default AddClassForm;
