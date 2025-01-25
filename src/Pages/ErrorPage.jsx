import { Helmet } from "react-helmet";
import { useNavigate, useRouteError } from "react-router-dom";



const ErrorPage = () => {
      const error=useRouteError()
      const navigate=useNavigate()
      return (
            <div className='flex flex-col justify-center items-center min-h-screen gap-2 bg-white '>
            <Helmet>
            <title>Error Page</title>
            </Helmet>
            {/* <div >
                  <Lottie animationData={errorlottie}></Lottie>

            </div> */}
            <h1 className='text-4xl text-black'>Ooops!!!</h1>
            <p className='text-black'>Sorry, an unexpected error has occurred.</p>
           <p className='text-black'>
              <i>{error.statusText || error.message} </i>
          </p>
          <button onClick={()=>navigate('/')} className="py-3 px-6 bg-[#000029] text-white rounded-lg font-semibold transition duration-500 ease-in-out relative overflow-hidden group text-center">
        <span className="absolute inset-0 bg-gradient-to-r from-[#000029] to-[#00FFFF] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
        <span className="relative group-hover:text-white transition duration-500 ease-in-out text-center">
          Go Back
        </span>
      </button>
      </div>
      );
};

export default ErrorPage;