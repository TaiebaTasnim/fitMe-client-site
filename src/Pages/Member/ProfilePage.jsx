import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { getAuth } from "firebase/auth";

// Function to fetch user data using axios
const fetchUserData = async (email) => {
  const response = await axios.get(`/users/${email}`);
  return response.data;
};

// Function to update user data using axios
const updateUserData = async (email, updatedData) => {
  const response = await axios.put(`/users/${email}`, updatedData);
  return response.data;
};

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser; // Get the current Firebase user object

  const { data: userData, isLoading, isError, error } = useQuery(
    ["user", user?.email],
    () => fetchUserData(user?.email),
    { enabled: !!user?.email } // Only run if email is available
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(userData?.name || "");
  const [profilePicture, setProfilePicture] = useState(userData?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = {
      name,
      photoURL: profilePicture,
    };

    try {
      const response = await updateUserData(user?.email, updatedUser);
      console.log(response)
      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
      // Optionally, you can also refetch data after updating, if necessary
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <section className="container mx-auto p-6">
      <div className="bg-gray-100 rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="text-center">
          <img
            src={userData?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
          <h1 className="text-2xl font-bold mt-4">{userData?.name || "User Name"}</h1>
          <p className="text-gray-600">{userData?.email || "user@example.com"}</p>
          <p className="text-gray-500 mt-2">
            Last Login: {user?.metadata?.lastSignInTime || "N/A"}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Update Profile
          </button>
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  value={userData?.email}
                  disabled
                  className="w-full p-2 border rounded-lg bg-gray-200 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProfilePicture(URL.createObjectURL(e.target.files[0]))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
