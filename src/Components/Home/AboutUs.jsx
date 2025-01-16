

const AboutUs=()=> {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container w-[90%] mx-auto flex flex-col md:flex-row items-center">
        {/* Text Content */}
        <div className="md:w-1/2 text-left px-4">
          <h2 className="text-3xl font-bold text-[#abc502] mb-4">
            ABOUT OUR GYM
          </h2>
          <div className="w-36 h-[2px] bg-[#abc502] mb-6"></div>
          <p className="text-gray-600 mb-4">
            Welcome to our state-of-the-art gym, where fitness meets excellence. 
            We provide top-notch facilities, cutting-edge equipment, and certified 
            trainers to help you achieve your fitness goals.
          </p>
          <p className="text-gray-600 mb-6">
            Our mission is to inspire and empower individuals to lead healthier lives. 
            Whether you’re just starting out or a seasoned athlete, we have the resources 
            and expertise to support your journey.
          </p>
          <button className="bg-[#abc502] text-black font-bold py-2 px-6 rounded-lg hover:bg-[#99b202] transition">
            JOIN FORCE
          </button>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 px-4 mt-8 md:mt-0">
          <img
            src="https://i.ibb.co.com/WvY9NVW/gym4.jpg" 
            alt="About Our Gym"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
