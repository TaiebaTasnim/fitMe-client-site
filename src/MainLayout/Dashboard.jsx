import { Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaLock} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useRole from "../hooks/useRole";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import { IoMoon, IoSunny } from "react-icons/io5";




const Dashboard = () => {
    const [role] = useRole()
    const { user, signout } = useContext(AuthContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dark,setDark]=useState(false)
    const darkModehandler=()=>{
      setDark(!dark)
      document.body.classList.toggle('dark')
    }


    const navigate = useNavigate()

    const handlesignout = () => {
        signout()
            .then(() => {
                toast.success("Logged out successfully");
                navigate("/login")
            })
            .catch((error) => {
                toast.error(`Logout failed: ${error.message}`);
            });
    };
    const handleNavLinkClick = () => {
        setIsSidebarOpen(false);
    };

    return (

        // <div className="relative min-h-screen md:flex bg-white">
        //     <Helmet><title>FitMe | Dashboard</title></Helmet>
        //     {/* dashboard side bar */}
        //     <div className="min-h-screen bg-[#abc502] pt-6">
        //         {
        //             role === 'member' && <div><ul className=" pl-4 space-y-5  ">


        //                 <li className="flex items-center gap-2">
        //                     <FaHome></FaHome>
        //                     <NavLink to="/dashboard/activityLog">

        //                         Activity Log</NavLink>

        //                 </li>
        //                 <li className="flex items-center gap-2">
        //                     <FaCalendar></FaCalendar>
        //                     <NavLink to={`/dashboard/profile/${user?.email}`}>

        //                         My Profile</NavLink>
        //                 </li>
        //                 <li className="flex items-center gap-2">
        //                     <FaShoppingCart></FaShoppingCart>
        //                     <NavLink to={`/dashboard/bookedTrainer/${user?.email}`}>

        //                         Booked Trainer </NavLink>
        //                 </li>
        //                 {/* <li className="flex items-center gap-2">
        //                     <FaShoppingCart></FaShoppingCart>
        //                     <NavLink to="/dashboard/beTrainer">

        //                         Be a Trainer </NavLink>
        //                 </li> */}



        //                 {/* shared nav links */}

        //                 <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
        //                 <li className="flex items-center gap-2">
        //                     <FaHome></FaHome>
        //                     <NavLink to="/">

        //                         Home </NavLink>
        //                 </li>






        //                 <li className="flex items-center gap-2" >
        //                     <FaLock></FaLock>
        //                     <NavLink to="/order/contact" onClick={handlesignout}>

        //                         Log Out</NavLink>
        //                 </li>




        //             </ul></div>}
        //         {role === 'admin' && <div><ul className=" pl-4 space-y-5  ">


        //             <li className="flex items-center gap-2">
        //                 <FaHome></FaHome>
        //                 <NavLink to="/dashboard/subscribers">

        //                     Newsletter Subscribers</NavLink>

        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaCalendar></FaCalendar>
        //                 <NavLink to="/dashboard/verifiedTrainers">

        //                     All Trainers</NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaShoppingCart></FaShoppingCart>
        //                 <NavLink to="/dashboard/appliedTrainers">

        //                     Applied Trainers </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaShoppingCart></FaShoppingCart>
        //                 <NavLink to="/dashboard/balance">

        //                     Balance </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaShoppingCart></FaShoppingCart>
        //                 <NavLink to="/dashboard/addClasses">

        //                     Add New Class </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaShoppingCart></FaShoppingCart>
                        
        //                 <NavLink to="/dashboard/addForumAdmin">

        //                     Add New Forum </NavLink>
        //             </li>




        //             {/* shared nav links */}

        //             <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
        //             <li className="flex items-center gap-2">
        //                 <FaHome></FaHome>
        //                 <NavLink to="/">

        //                     Home </NavLink>
        //             </li>






        //             <li className="flex items-center gap-2" >
        //                 <FaLock></FaLock>
        //                 <NavLink to="/order/contact" onClick={handlesignout}>

        //                     Log Out</NavLink>
        //             </li>




        //         </ul></div>}
        //         {role === 'trainer' && <div><ul className=" pl-4 space-y-5  ">


        //             <li className="flex items-center gap-2">
        //                 <FaHome></FaHome>
        //                 <NavLink to="/dashboard/manageSlots">

        //                     Manage Slots</NavLink>

        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaCalendar></FaCalendar>
        //                 <NavLink to="/dashboard/addSlot">

        //                     Add New Slot</NavLink>
        //             </li>
                    
        //             <li className="flex items-center gap-2">
        //                 <FaShoppingCart></FaShoppingCart>
        //                 <NavLink to="/dashboard/addForumTrainer">

        //                     Add New Forum </NavLink>
        //             </li>




        //             {/* shared nav links */}

        //             <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
        //             <li className="flex items-center gap-2">
        //                 <FaHome></FaHome>
        //                 <NavLink to="/">

        //                     Home </NavLink>
        //             </li>






        //             <li className="flex items-center gap-2" >
        //                 <FaLock></FaLock>
        //                 <NavLink to="/order/contact" onClick={handlesignout}>

        //                     Log Out</NavLink>
        //             </li>




        //         </ul></div>}

        //     </div>
        //     {/* dashboard content */}
        //     <div className="flex-1 p-8">
        //         <Outlet></Outlet>
        //     </div>
        // </div>
        // <div className="relative min-h-screen lg:flex bg-white">
        //     <Helmet><title>FitMe | Dashboard</title></Helmet>
        //     {!isSidebarOpen && (
        //         <button 
        //             className="absolute top-4 left-4 lg:hidden text-2xl z-50" 
        //             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        //         >
        //             <FaBars />
        //         </button>
        //     )}
        //     {/* dashboard side bar */}
        //     <div className={`min-h-screen bg-[#abc502] pt-6 absolute lg:relative w-64 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        //     <div className="flex items-center space-x-2 pl-4 mb-4">
        //     {/* Logo */}
        //     <div className="w-10 h-10  flex justify-center items-center">
        //       {/* Add an SVG or an icon */}
        //      <img src="/logo-web.webp" alt="logo" className="rounded-full " />
        //     </div>
        //     {/* Website Name */}
        //     <span className="text-2xl font-semibold">FitMe</span>
        //   </div>
        //         {role === 'member' && <div><ul className="pl-4 space-y-5">
        //             <li className="flex items-center gap-2">
                        
        //                 <NavLink to="/dashboard/activityLog" onClick={handleNavLinkClick}>
        //                     Activity Log
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                       
        //                 <NavLink to={`/dashboard/profile/${user?.email}`} onClick={handleNavLinkClick}>
        //                     My Profile
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                       
        //                 <NavLink to={`/dashboard/bookedTrainer/${user?.email}`} onClick={handleNavLinkClick}>
        //                     Booked Trainer 
        //                 </NavLink>
        //             </li>
        //             <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
        //             <li className="flex items-center gap-2">
        //                 <FaHome />
        //                 <NavLink to="/" onClick={handleNavLinkClick}>
        //                     Home 
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaLock />
        //                 <NavLink  onClick={handlesignout}>
        //                     Log Out
        //                 </NavLink>
        //             </li>
        //         </ul></div>}
        //         {role === 'admin' && <div><ul className="pl-4 space-y-5">
        //             <li className="flex items-center gap-2">
                        
        //                 <NavLink to="/dashboard/subscribers" onClick={handleNavLinkClick}>
        //                     Newsletter Subscribers
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                       
        //                 <NavLink to="/dashboard/verifiedTrainers" onClick={handleNavLinkClick}>
        //                     All Trainers
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                        
        //                 <NavLink to="/dashboard/appliedTrainers" onClick={handleNavLinkClick}>
        //                     Applied Trainers 
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                        
        //                 <NavLink to="/dashboard/balance" onClick={handleNavLinkClick}>

        //                     Balance </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                        
        //                  <NavLink to="/dashboard/addClasses" onClick={handleNavLinkClick}>

        //                     Add New Class </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                     
                        
        //                  <NavLink to="/dashboard/addForumAdmin" onClick={handleNavLinkClick}>

        //                      Add New Forum </NavLink>
        //              </li>
        //             <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
        //             <li className="flex items-center gap-2">
        //                 <FaHome />
        //                 <NavLink to="/" onClick={handleNavLinkClick}>
        //                     Home 
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaLock />
        //                 <NavLink  onClick={handlesignout}>
        //                     Log Out
        //                 </NavLink>
        //             </li>
        //         </ul></div>}
        //         {role === 'trainer' && <div><ul className="pl-4 space-y-5">
        //             <li className="flex items-center gap-2">
                       
        //                 <NavLink to="/dashboard/manageSlots" onClick={handleNavLinkClick}>
        //                     Manage Slots
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                        
        //                 <NavLink to="/dashboard/addSlot" onClick={handleNavLinkClick}>
        //                     Add New Slot
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
                         
        //                  <NavLink to="/dashboard/addForumTrainer" onClick={handleNavLinkClick}>

        //                      Add New Forum </NavLink>
        //              </li>
        //             <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
        //             <li className="flex items-center gap-2">
        //                 <FaHome />
        //                 <NavLink to="/" onClick={handleNavLinkClick}>
        //                     Home 
        //                 </NavLink>
        //             </li>
        //             <li className="flex items-center gap-2">
        //                 <FaLock />
        //                 <NavLink  onClick={handlesignout}>
        //                     Log Out
        //                 </NavLink>
        //             </li>
        //         </ul></div>}
        //     </div>
        //     {/* dashboard content */}
        //     <div className="flex-1 p-8">
        //         <Outlet />
        //     </div>
        // </div>
        <div className="relative min-h-screen flex bg-white">
  <Helmet><title>FitMe | Dashboard</title></Helmet>

  {!isSidebarOpen && (
    <button 
      className="absolute top-4 left-4 lg:hidden text-2xl z-50 dark:text-white" 
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <FaBars />
    </button>
  )}

  {/* Sidebar */}
  <div className={`min-h-screen bg-[#abc502] pt-6 fixed lg:relative w-64 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-40`}>
    <div className="flex  items-center space-x-10 pl-4 mb-4">
      <div className="flex items-center space-x-2">
      <div className="w-10 h-10 flex justify-center items-center">
        <img src="/logo-web.webp" alt="logo" className="rounded-full" />
      </div>
      <span className="text-2xl font-semibold font-display">FitMe</span>

      </div>
      
     
     
    </div>
    {/* Navigation Links */}
    {role === 'member' && (
      <ul className="pl-4 space-y-5">
        <li className="flex items-center gap-2 font-display">
          <NavLink to="/dashboard/activityLog" onClick={handleNavLinkClick}>
            Activity Log
          </NavLink>
        </li>
        <li className="flex items-center gap-2 font-display">
          <NavLink to={`/dashboard/profile/${user?.email}`} onClick={handleNavLinkClick}>
            My Profile
          </NavLink>
        </li>
        <li className="flex items-center gap-2 font-display">
                       
                       <NavLink to={`/dashboard/bookedTrainer/${user?.email}`} onClick={handleNavLinkClick}>
                             Booked Trainer 
                         </NavLink>
                     </li>
        <div className="w-52 h-[2px] bg-black my-6"></div>
        <div className="    ">
      <button className="text-xl md:text-2xl text-black " onClick={darkModehandler}>
                      {
                        dark && <IoSunny></IoSunny>
                      }
                       {
                        !dark && <IoMoon></IoMoon>
                      }
                    </button>

      </div>
        <li className="flex items-center gap-2 font-display">
          <FaHome />
          <NavLink to="/" onClick={handleNavLinkClick}>
            Home
          </NavLink>
        </li>
        <li className="flex items-center gap-2 font-display">
          <FaLock />
          <NavLink onClick={handlesignout}>
            Log Out
          </NavLink>
        </li>
      </ul>
    )}
     {role === 'admin' && <div><ul className="pl-4 space-y-5">
                    <li className="flex items-center gap-2 font-display">
                        
                        <NavLink to="/dashboard/subscribers" onClick={handleNavLinkClick}>
                            Newsletter Subscribers
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                       
                        <NavLink to="/dashboard/verifiedTrainers" onClick={handleNavLinkClick}>
                            All Trainers
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                        
                        <NavLink to="/dashboard/appliedTrainers" onClick={handleNavLinkClick}>
                            Applied Trainers 
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                        
                        <NavLink to="/dashboard/balance" onClick={handleNavLinkClick}>

                            Balance </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                        
                         <NavLink to="/dashboard/addClasses" onClick={handleNavLinkClick}>

                            Add New Class </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                     
                        
                         <NavLink to="/dashboard/addForumAdmin" onClick={handleNavLinkClick}>

                             Add New Forum </NavLink>
                     </li>
                    <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
                    <button className="text-xl md:text-2xl text-black " onClick={darkModehandler}>
                      {
                        dark && <IoSunny></IoSunny>
                      }
                       {
                        !dark && <IoMoon></IoMoon>
                      }
                    </button>
                    <li className="flex items-center gap-2 font-display">
                        <FaHome />
                        <NavLink to="/" onClick={handleNavLinkClick}>
                            Home 
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                        <FaLock />
                        <NavLink  onClick={handlesignout}>
                            Log Out
                        </NavLink>
                    </li>
                </ul></div>}
                {role === 'trainer' && <div><ul className="pl-4 space-y-5">
                    <li className="flex items-center gap-2 font-display">
                       
                        <NavLink to="/dashboard/manageSlots" onClick={handleNavLinkClick}>
                            Manage Slots
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                        
                        <NavLink to="/dashboard/addSlot" onClick={handleNavLinkClick}>
                            Add New Slot
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                         
                         <NavLink to="/dashboard/addForumTrainer" onClick={handleNavLinkClick}>

                             Add New Forum </NavLink>
                     </li>
                    <div className="w-52 h-[2px] bg-black my-4 text-center"></div>
                    
      <button className="text-xl md:text-2xl text-black " onClick={darkModehandler}>
                      {
                        dark && <IoSunny></IoSunny>
                      }
                       {
                        !dark && <IoMoon></IoMoon>
                      }
                    </button>

      
                    <li className="flex items-center gap-2 font-display">
                        <FaHome />
                        <NavLink to="/" onClick={handleNavLinkClick}>
                            Home 
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2 font-display">
                        <FaLock />
                        <NavLink  onClick={handlesignout}>
                            Log Out
                        </NavLink>
                    </li>
                </ul></div>}
  </div>

  {/* Dashboard Content */}
  <div className="dark:bg-black min-h-screen overflow-y-auto flex-1">
  <div className="lg:ml-10 p-8  ">
    <Outlet />
  </div>

  </div>
  

  
  
</div>



    );
};

export default Dashboard;