import  { useContext, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../api/utils";
import { AuthContext } from "../../Provider/AuthProvider";

const AddForum = () => {
  const formRef = useRef(null); // Reference to reset the form
  const axiosSecure = useAxiosSecure();
  const {user}=useContext(AuthContext)

  const addForumMutation = useMutation({
    mutationFn: async (forumData) => {
      const response = await axiosSecure.post("/forums1", forumData);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Forum added successfully!");
      if (formRef.current) {
        formRef.current.reset(); // Reset the form fields after success
      }
    },
    onError: (error) => {
      console.error("Error adding forum:", error.message);
      toast.error("Failed to add forum.");
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const image = event.target.banner_image.files[0];
    // Upload the image using the `imageUpload` utility function
    const bannerImageURL = await imageUpload(image);

    const forumData = {
      forum_title: event.target.forum_title.value,
      class_details: event.target.class_details.value,
      banner_image: bannerImageURL,
      userEmail:user?.email,

    };

    addForumMutation.mutate(forumData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Add New Forum
        </h2>

        {/* Forum Title */}
        <div className="mb-4">
          <label
            htmlFor="forum_title"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Forum Title
          </label>
          <input
            type="text"
            id="forum_title"
            name="forum_title"
            placeholder="Enter forum title"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#abc502] focus:outline-none"
          />
        </div>

        {/* Banner Image */}
        <div className="mb-4">
          <label
            htmlFor="banner_image"
            className="block text-sm font-medium text-gray-600 mb-2"
          >
            Banner Image
          </label>
          <input
            required
            type="file"
            id="banner_image"
            name="banner_image"
            accept="image/*"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#abc502] focus:outline-none"
          />
        </div>

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
          disabled={addForumMutation.isLoading}
          className="w-full bg-[#abc502] text-black font-medium py-2 px-4 rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-[#abc502] transition"
        >
          {addForumMutation.isLoading ? "Saving..." : "Add Forum"}
        </button>
      </form>
    </div>
  );
};

export default AddForum;
