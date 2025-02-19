import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const NewsletterSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const axiosPublic=useAxiosPublic()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with:', name, email);
    try {
      const response = await axiosPublic.post('/subscribe', {
        name,
        email,
      });
      console.log(response.data)

      if (response.data.result.insertedId) {
        toast.success('Subscription successful!');
        setName('');
        setEmail('');
      } else {
        toast.error('Subscription failed. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };


  return (
      <div className="bg-[#abc502]  my-10 dark:my-0    container mx-auto w-[88%] py-12 ">
    <section className="text-center">
        <h2 className="text-4xl font-bold text-black mb-6">Subscribe to Our Newsletter</h2>
        <p className="text-gray-800 mb-8">Stay updated with the latest news and offers</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 w-72 rounded-lg text-black focus:outline-none"
          />
          <input
            type="email"
            required
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-72 rounded-lg text-black focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded-lg mt-4 hover:scale-105 transition duration-500 ease-in-out"
          >
            Subscribe Now
          </button>
        </form>
      
    </section>
    </div>
  );
};

export default NewsletterSection;
