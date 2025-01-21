import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";


const Payment = () => {
      const {user}=useContext(AuthContext)
      const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
      
      
      const {index,id,pkgId}=useParams()
      const axiosSecure=useAxiosSecure()
      const axiosPublic=useAxiosPublic()
      const { data: trainer, isLoading, isError, error } = useQuery({
            queryKey: ["trainer", id],
            queryFn: async () => {
                  const res = await axiosSecure.get(`/trainers/${id}`);
                  return res.data;
                },
          });

          const {  data } = useQuery({
            queryKey: ['package'],
            queryFn: async() => {
                const res = await axiosPublic.get(`/package/${pkgId}`);
                console.log(res.data)
                return res.data;
            }
        })
        
          if (isLoading) return <LoadingSpinner></LoadingSpinner>;
          if (isError) return <p>Error: {error.message}</p>;
      return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center py-10">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Payment Details
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Trainer Name:</p>
            <p className="text-gray-800 font-semibold">{trainer.full_name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Selected Slot:</p>
            <p className="text-gray-800 font-semibold">{trainer.available_days[index]} :  {trainer.available_time.start} - {trainer.available_time.end}</p>
          </div>
          <div className="mt-6">
                      <h3 className="text-lg font-bold text-gray-700">Classes</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {trainer.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[#abc502] text-black rounded-full text-sm font-medium shadow-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Package Name:</p>
            <p className="text-gray-800 font-semibold">{data.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Price:</p>
            <p className="text-gray-800 font-semibold">$ {data.price}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Booker Name:</p>
            <p className="text-gray-800 font-semibold">{user?.displayName}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Booker Email:</p>
            <p className="text-gray-800 font-semibold">{user?.email}</p>
          </div>
        </div>
        <hr className="mt-4"></hr>
        <div className="mt-6">
           
            
<Elements stripe={stripePromise}>
                    <CheckoutForm pkgId={pkgId} trainer={trainer} index={index}></CheckoutForm>
                </Elements>
        </div>
        
      </div>
      
    </div>
      );
};

export default Payment;
