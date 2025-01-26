
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "animate.css";
import { Link } from "react-router-dom";

const  Banner=()=> {
  const slides = [
    {
      image: "https://i.ibb.co/xjjhwpr/gym2.jpg",
      title: "AWESOME FITNESS",
      description: "GET FIT IN LESS THAN 2 WEEKS",
      subtext: "We provide high-quality fitness programs tailored for you.",
      buttonText: "Explore More",
    },
    {
      image: "https://i.ibb.co/4mwz9mR/gym3.jpg",
      title: "BUILD YOUR STRENGTH",
      description: "ACHIEVE YOUR GOALS",
      subtext: "Join our expert trainers and achieve greatness.",
      buttonText: "Explore More",
    },
    {
      image: "https://i.ibb.co/Q9J6jSJ/gym1.jpg",
      title: "TRANSFORM YOUR BODY",
      description: "PUSH YOUR LIMITS",
      subtext: "Get ready for a new chapter of fitness excellence.",
      buttonText: "Explore More",
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        navigation
        loop
        className="h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center flex flex-col justify-center items-start text-left text-white px-8 "
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4 animate__animated animate__fadeInDown uppercase ml-10">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-2xl font-semibold mb-2 text-[#abc502] animate__animated animate__fadeInUp  ml-10  border-b-[#abc502] border-b-2">
                {slide.description}
              </p>
             
              

              {/* Subtext */}
              <p className="text-lg mb-6 animate__animated animate__fadeInUp  max-w-[600px] leading-relaxed ml-10">
                {slide.subtext}
              </p>

              {/* Button */}
              <Link to="/allClasses" className="px-6 py-3 bg-[#abc502] text-black font-medium rounded-lg shadow-lg hover:bg-[#9ab002] transition animate__animated animate__fadeInUp  ml-10">
              {slide.buttonText}
              </Link>
                
                
              
               
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
