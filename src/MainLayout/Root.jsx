import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { ComplexNavbar } from "../Components/Shared/Navber";


const Root = () => {
      return (
            <div>
                  <ComplexNavbar></ComplexNavbar>
                  <div className="min-h-[calc(100vh-301px)]">
                  <Outlet ></Outlet>
                  </div>
                 
                  <Footer></Footer>
                  
            </div>
      );
};

export default Root;