import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { ComplexNavbar } from "../Components/Shared/Navber";


const Root = () => {
      return (
            <div id="root" className="font-display ">
                  <ComplexNavbar></ComplexNavbar>
                  <div className="min-h-[calc(100vh-301px)] dark:bg-black dark:pb-16">
                  <Outlet ></Outlet>
                  </div>
                 
                  <Footer></Footer>
                  
            </div>
      );
};

export default Root;