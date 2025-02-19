import { Helmet } from "react-helmet";
import { useNavigate, useRouteError } from "react-router-dom";



const ErrorPage = () => {
      const error=useRouteError()
      const navigate=useNavigate()
      return (
            <div className='flex flex-col justify-center items-center min-h-screen gap-2 bg-white dark:bg-black'>
            <Helmet>
            <title>Error Page</title>
            </Helmet>
            {/* <div >
                  <Lottie animationData={errorlottie}></Lottie>

            </div> */}
            <h1 className='text-4xl text-black dark:text-white'>Ooops!!!</h1>
            <p className='text-black dark:text-white'>Sorry, an unexpected error has occurred.</p>
           <p className='text-black dark:text-white'>
              <i>{error.statusText || error.message} </i>
          </p>
          <button onClick={()=>navigate('/')} className="py-3 px-6 bg-[#abc502] text-black rounded-lg font-semibold transition duration-500 ease-in-out relative overflow-hidden group text-center transform group-hover:scale-105">
           <span className="absolute inset-0 bg-gradient-to-r from-[#abc502] via-[#f5ff66] to-[#73ff00] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
           <span className="relative group-hover:black transition duration-500 ease-in-out text-center flex items-center gap-2">
             Go Back 
           </span>
         </button>
      </div>
      );
};

export default ErrorPage;