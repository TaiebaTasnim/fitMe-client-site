import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { imageUpload, saveUser } from '../api/utils';
import { Helmet } from 'react-helmet';

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    const photoURL = await imageUpload(image);

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      await saveUser({ ...result?.user, displayName: name, photoURL });
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-black mt-10 mb-10 dark:mb-0">
      <Helmet>
        <title>FitMe | SignUp</title>
      </Helmet>
      <div className="max-w-md w-full  mt-16 p-6 bg-white shadow-md rounded-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-gray-500">Welcome to FitMe</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-200 focus:ring-lime-500" placeholder="Enter Your Name" />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Select Image:</label>
            <input type="file" id="image" name="image" accept="image/*" className="mt-1 w-full" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-200 focus:ring-lime-500" placeholder="Enter Your Email" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" name="password" id="password" required className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-200 focus:ring-lime-500" placeholder="*******" />
          </div>
          <button type="submit" className="w-full bg-lime-500 text-white py-2 rounded-md flex justify-center items-center">
            {loading ? <TbFidgetSpinner className="animate-spin" /> : 'Continue'}
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">Or sign up with</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center border py-2 rounded-md hover:bg-gray-100">
          <FcGoogle className="text-2xl mr-2" /> Continue with Google
        </button>
        <p className="text-sm text-center text-gray-500">Already have an account? <Link to="/login" className="text-lime-500 hover:underline">Login</Link></p>
      </div>
    </div>
  );
};

export default Register;
