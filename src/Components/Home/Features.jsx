
import { FaThumbsUp, FaTrophy, FaBriefcase, FaUsers } from "react-icons/fa";

const Features=()=> {
  const features = [
    {
      icon: <FaThumbsUp className="text-4xl text-[#abc502]" />,
      title: "Top-notch Services",
      description:
        "We are committed to providing the best services in Melbourne, ensuring quality and excellence in everything we do.",
    },
    {
      icon: <FaTrophy className="text-4xl text-[#abc502]" />,
      title: "Certified Trainers",
      description:
        "Our trainers are highly qualified and certified, offering personalized guidance tailored to your fitness journey.",
    },
    {
      icon: <FaBriefcase className="text-4xl text-[#abc502]" />,
      title: "Modern Facilities",
      description:
        "We offer state-of-the-art gym facilities and equipment to help you achieve your goals in a cutting-edge environment.",
    },
    {
      icon: <FaUsers className="text-4xl text-[#abc502]" />,
      title: "Satisfied Members",
      description:
        "Thousands of happy members trust us for their fitness needs and continue to recommend our services.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container w-[90%] mx-auto text-center">
        {/* Section Heading */}
       <div className="flex flex-col items-center justify-center">
       <h2 className="text-3xl font-bold text-[#abc502] mb-4">
          WHY CHOOSE US?
          
        </h2>
        <div className="w-36 h-[2px] bg-[#abc502] mb-6 text-center"></div>
       
        
        <p className="text-lg text-gray-600 mb-8">
          We provide unmatched quality to help you achieve your fitness goals.
        </p>
       </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center mb-4 bg-white rounded-full shadow-md hover:bg-black">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-black mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
