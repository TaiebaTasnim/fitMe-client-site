import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import { Helmet } from "react-helmet";

const AddClassForm = () => {
  const formRef = useRef(null); // Reference to reset the form
  const axiosSecure = useAxiosSecure();

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

  const handleSubmit = async(event) => {
    event.preventDefault();
     const image = event.target.image.files[0]
    
        //1. send image data to imgbb
        const photoURL = await imageUpload(image)

    const classData = {
      class_name: event.target.class_name.value,
      class_image: photoURL,
      class_details: event.target.class_details.value,
    };

    addClassMutation.mutate(classData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Helmet><title>FitMe | Add Class</title></Helmet>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-[#abc502] text-center mb-6">
          Add New Class
        </h2>

        {/* Class Name */}
        <div className="mb-4">
          <label
            htmlFor="class_name"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Class Name
          </label>
          <input
            type="text"
            id="class_name"
            name="class_name"
            placeholder="Enter class name"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#abc502] focus:outline-none"
          />
        </div>

        {/* Class Image */}
        <div className="mb-4">
        <label
            htmlFor="class_image"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Class Image URL
          </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
                
               className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#abc502] focus:outline-none"
              />
            </div>
        {/* <div className="mb-4">
          <label
            htmlFor="class_image"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Class Image URL
          </label>
          <input
            type="text"
            id="class_image"
            name="class_image"
            placeholder="Enter class image URL"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#abc502] focus:outline-none"
          />
        </div> */}

        {/* Class Details */}
        <div className="mb-6">
          <label
            htmlFor="class_details"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Class Details
          </label>
          <textarea
            id="class_details"
            name="class_details"
            placeholder="Enter class details"
            rows="4"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#abc502] focus:outline-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={addClassMutation.isLoading}
          className="w-full bg-[#abc502] text-black font-medium py-2 px-4 rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-[#abc502] transition"
        >
          {addClassMutation.isLoading ? "Saving..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClassForm;
