
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "animate.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const  Banner=()=> {
  const slides = [
    {
      "image": "https://i.ibb.co.com/ccMgFRYP/pexels-sarazhizmailov-11183203.jpg",
      "title": "AWESOME FITNESS",
      "description": "Get fit, feel strong, and boost your energy in just 2 weeks!",
      "subtext": "We provide high-quality, results-driven fitness programs designed to match your lifestyle and goals.",
      "buttonText": "Explore More"
    },
    {
      "image": "https://i.ibb.co.com/rKk0s1jp/pexels-krzysztof-biernat-406313862-15046713.jpg",
      "title": "BUILD YOUR STRENGTH",
      "description": "Unlock your full potential with expert-led strength training.",
      "subtext": "Join our professional trainers and take your fitness journey to the next level with customized workouts and motivation.",
      "buttonText": "Explore More"
    },
    {
      "image": "https://i.ibb.co/xjjhwpr/gym2.jpg",
      "title": "TRANSFORM YOUR BODY",
      "description": "Push beyond your limits and achieve the physique you’ve always wanted.",
      "subtext": "Our advanced fitness programs and supportive community will help you stay committed and see real results.",
      "buttonText": "Explore More"
    }
  ]
  

  return (
    <div className="relative ">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full min-h-screen  md:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center   px-6 md:px-16 lg:px-24 ">
                <div className="text-white text-center animate__animated animate__fadeInRight">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg lg:text-xl mb-6 leading-relaxed text-center w-[60%] mx-auto">
                    {slide.subtext}
                  </p>
                  <Link to='/allClasses'>
                  <button className="py-3 px-6 bg-[#abc502] text-black rounded-lg font-semibold transition duration-500 ease-in-out relative overflow-hidden group text-center transform group-hover:scale-105">
  <span className="absolute inset-0 bg-gradient-to-r from-[#abc502] via-[#f5ff66] to-[#73ff00] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
  <span className="relative group-hover:black transition duration-500 ease-in-out text-center flex items-center gap-2">
    Explore More <FaArrowRight />
  </span>
</button>



                  </Link>
                  
                 
                </div>
              </div>
            </div>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
