import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import necessary modules
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReactStars from "react-rating-stars-component";

import useAxiosPublic from "../../hooks/useAxiosPublic";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const response = await axiosPublic.get("/reviews");
      console.log(response.data);
      return response.data;
    },
  });

  if (isLoading) return <p>Loading testimonials...</p>;

  return (
    <div className="my-12 container mx-auto w-[90%] p-4">
      
      <h2 className="text-4xl font-bold text-center mb-8">What Our Clients Say</h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          // Adjust based on screen size
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          300: { slidesPerView: 1 },
        }}
        className="pb-10"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <img
                  src={review.image}
                  alt="User Avatar"
                  className="w-16 h-16 rounded-full mb-4 shadow-md"
                />
                <h3 className="font-bold text-lg text-gray-800 mb-2">
                  {review.userName || "Anonymous"}
                </h3>
              </div>
              <p className="text-sm text-gray-600 italic mb-4 text-center">
              
                &quot;{review.feedback}&quot;
              </p>
              <div className="flex justify-center">
                <ReactStars
                  count={5}
                  value={review.rating}
                  size={24}
                  isHalf={true}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
