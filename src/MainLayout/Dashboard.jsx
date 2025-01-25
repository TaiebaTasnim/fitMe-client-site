import { Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaCalendar, FaHome, FaLock, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useRole from "../hooks/useRole";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";




const Dashboard = () => {
    const [role] = useRole()
    const { user, signout } = useContext(AuthContext)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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
        <div className="relative min-h-screen md:flex bg-white">
            <Helmet><title>FitMe | Dashboard</title></Helmet>
            {!isSidebarOpen && (
                <button 
                    className="absolute top-4 left-4 md:hidden text-2xl z-50" 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <FaBars />
                </button>
            )}
            {/* dashboard side bar */}
            <div className={`min-h-screen bg-[#abc502] pt-6 absolute md:relative w-64 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                {role === 'member' && <div><ul className="pl-4 space-y-5">
                    <li className="flex items-center gap-2">
                        <FaHome />
                        <NavLink to="/dashboard/activityLog" onClick={handleNavLinkClick}>
                            Activity Log
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaCalendar />
                        <NavLink to={`/dashboard/profile/${user?.email}`} onClick={handleNavLinkClick}>
                            My Profile
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaShoppingCart />
                        <NavLink to={`/dashboard/bookedTrainer/${user?.email}`} onClick={handleNavLinkClick}>
                            Booked Trainer 
                        </NavLink>
                    </li>
                    <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
                    <li className="flex items-center gap-2">
                        <FaHome />
                        <NavLink to="/" onClick={handleNavLinkClick}>
                            Home 
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaLock />
                        <NavLink  onClick={handlesignout}>
                            Log Out
                        </NavLink>
                    </li>
                </ul></div>}
                {role === 'admin' && <div><ul className="pl-4 space-y-5">
                    <li className="flex items-center gap-2">
                        <FaHome />
                        <NavLink to="/dashboard/subscribers" onClick={handleNavLinkClick}>
                            Newsletter Subscribers
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaCalendar />
                        <NavLink to="/dashboard/verifiedTrainers" onClick={handleNavLinkClick}>
                            All Trainers
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaShoppingCart />
                        <NavLink to="/dashboard/appliedTrainers" onClick={handleNavLinkClick}>
                            Applied Trainers 
                        </NavLink>
                    </li>
                    <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
                    <li className="flex items-center gap-2">
                        <FaHome />
                        <NavLink to="/" onClick={handleNavLinkClick}>
                            Home 
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaLock />
                        <NavLink  onClick={handlesignout}>
                            Log Out
                        </NavLink>
                    </li>
                </ul></div>}
                {role === 'trainer' && <div><ul className="pl-4 space-y-5">
                    <li className="flex items-center gap-2">
                        <FaHome />
                        <NavLink to="/dashboard/manageSlots" onClick={handleNavLinkClick}>
                            Manage Slots
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaCalendar />
                        <NavLink to="/dashboard/addSlot" onClick={handleNavLinkClick}>
                            Add New Slot
                        </NavLink>
                    </li>
                    <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
                    <li className="flex items-center gap-2">
                        <FaHome />
                        <NavLink to="/" onClick={handleNavLinkClick}>
                            Home 
                        </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaLock />
                        <NavLink  onClick={handlesignout}>
                            Log Out
                        </NavLink>
                    </li>
                </ul></div>}
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>


    );
};

export default Dashboard;