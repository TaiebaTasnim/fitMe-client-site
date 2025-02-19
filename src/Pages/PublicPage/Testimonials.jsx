import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReactStars from "react-rating-stars-component";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

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

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="my-12 container mx-auto w-[90%] p-4">
      <h2 className="text-4xl font-bold text-center mb-8 text-[#abc502]">
        What Our Clients Say?
      </h2>
      <div className="w-36 mx-auto h-[2px] bg-[#abc502] mb-12"></div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          300: { slidesPerView: 1 },
        }}
        className="pb-10"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center h-full dark:border-[#abc502] dark:border-2">
              {/* User Avatar */}
              <img
                src={review.image}
                alt="User Avatar"
                className="w-16 h-16 rounded-full mb-4 shadow-md object-cover"
              />

              {/* Name */}
              <h3 className="font-bold text-lg text-gray-800 mb-2 text-center">
                {review.userName || "Anonymous"}
              </h3>

              {/* Feedback - Fixed Height for Uniformity */}
              <p className="text-sm text-gray-600 italic text-center flex-grow line-clamp-3">
                &quot;{review.feedback.length > 120 
                  ? `${review.feedback.substring(0, 120)}...` 
                  : review.feedback}&quot;
              </p>

              {/* Star Rating */}
              <div className="flex justify-center mt-4">
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
