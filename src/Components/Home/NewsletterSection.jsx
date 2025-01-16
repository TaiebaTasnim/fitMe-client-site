import { useState } from "react";


const NewsletterSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed with:', name, email);
  };

  return (
    <section className="bg-[#abc502] container mx-auto w-[90%] py-12 my-10">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-black mb-6">Subscribe to Our Newsletter</h2>
        <p className="text-gray-800 mb-8">Stay updated with the latest news and offers</p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 w-72 rounded-lg text-black focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 w-72 rounded-lg text-black focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white rounded-lg mt-4 hover:bg-[#8a8a8a]"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
