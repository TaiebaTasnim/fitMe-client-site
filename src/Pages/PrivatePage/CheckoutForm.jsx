/* eslint-disable react/prop-types */
import { CardElement } from "@stripe/react-stripe-js";
import {  useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

//import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";



const CheckoutForm = ({pkgId,trainer,index}) => {
      
      //const [error , setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    
    const { user } = useContext(AuthContext);
    
    const navigate = useNavigate();
    
   

    useEffect(() => {
      
          axiosSecure.post('/create-payment-intent', {pkgId})
              .then(res => {
                  console.log(res.data.clientSecret);
                  setClientSecret(res.data.clientSecret);
              })
      

  }, [axiosSecure,pkgId])

      const handleSubmit = async (event) => {
            event.preventDefault();
    
            if (!stripe || !elements) {
                return
            }
    
            const card = elements.getElement(CardElement)
    
            if (card === null) {
                return
            }
    
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card
            })
    
            if (error) {
                console.log('payment error', error);
                //setError(error.message);
                console.log(error)
            }
            else {
                console.log('payment method', paymentMethod)
                //setError('');
            }
    
            // confirm payment
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            })
    
            if (confirmError) {
                console.log('confirm error')
            }
            else {
                console.log('payment intent', paymentIntent)
                if (paymentIntent.status === 'succeeded') {
                    console.log('transaction id', paymentIntent.id);
                    setTransactionId(paymentIntent.id);
                    console.log(transactionId)
    
                    // now save the payment in the database
                    const payment = {
                        email: user.email,
                        trainerEmail:trainer.email,
                        pkgId,
                        index,
                        transactionId: paymentIntent.id,
                        date: new Date(), // utc date convert. use moment js to 
                        
                    }
    
                    const res = await axiosSecure.post('/payments', payment);
                    console.log('payment saved', res.data);
                  
                    if (res.data?.paymentResult?.insertedId) {
                        Swal.fire({
                            position: "top-center",
                            icon: "success",
                            title: "Thank you for the payment",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/dashboard')
                    }
    
                }
            }
    
        }
    
      return ( 
            <div>
                  <form onSubmit={handleSubmit} >
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
           <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition" disabled={!stripe || !clientSecret}>
          Proceed to Payment
        </button>
        </form>
                  
            </div>
      );
};

export default CheckoutForm;