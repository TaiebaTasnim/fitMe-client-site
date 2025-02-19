import { Link } from "react-router-dom";


const AboutUs=()=> {
  return (
    <section className="bg-gray-100 py-16 dark:bg-black">
      <div className="container w-[90%] mx-auto flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-left px-4">
          <h2 className="text-3xl font-bold text-[#abc502] mb-4">
            ABOUT OUR GYM
          </h2>
          <div className="w-36 h-[2px] bg-[#abc502] mb-6"></div>
          <p className="text-gray-600 mb-4 dark:text-gray-400">
            Welcome to our state-of-the-art gym, where fitness meets excellence. 
            We provide top-notch facilities, cutting-edge equipment, and certified 
            trainers to help you achieve your fitness goals.
          </p>
          <p className="text-gray-600 mb-6 dark:text-gray-400">
            Our mission is to inspire and empower individuals to lead healthier lives. 
            Whether you’re just starting out or a seasoned athlete, we have the resources 
            and expertise to support your journey.
          </p>
          <Link to='/allClasses'>
                            <button className="py-3 px-6 bg-[#abc502] text-black rounded-lg font-semibold transition duration-500 ease-in-out relative overflow-hidden group text-center transform group-hover:scale-105">
            <span className="absolute inset-0 bg-gradient-to-r from-[#abc502] via-[#f5ff66] to-[#73ff00] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative group-hover:black transition duration-500 ease-in-out text-center flex items-center gap-2">
              Join Force 
            </span>
          </button>
          </Link>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 px-4 mt-8 md:mt-0">
          <img
            src="https://i.ibb.co.com/WvY9NVW/gym4.jpg" 
            alt="About Our Gym"
            className="rounded-lg shadow-lg dark:border-[#abc502] dark:border-2"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
