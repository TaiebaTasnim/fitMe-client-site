import { Outlet } from "react-router-dom";
import { FaCalendar, FaHome, FaLock, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import useRole from "../hooks/useRole";




const Dashboard = () => {
    const [role] = useRole()
    return (

        <div className="relative min-h-screen md:flex bg-white">
            {/* dashboard side bar */}
            <div className="min-h-screen bg-[#abc502] pt-6">
                {
                    role === 'member' && <div><ul className=" pl-4 space-y-5  ">


                        <li className="flex items-center gap-2">
                            <FaHome></FaHome>
                            <NavLink to="/dashboard/userHome">

                                Activity Log</NavLink>

                        </li>
                        <li className="flex items-center gap-2">
                            <FaCalendar></FaCalendar>
                            <NavLink to="/dashboard/history">

                                My Profile</NavLink>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaShoppingCart></FaShoppingCart>
                            <NavLink to="/dashboard/cart">

                                Booked Trainer </NavLink>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaShoppingCart></FaShoppingCart>
                            <NavLink to="/dashboard/beTrainer">

                                Be a Trainer </NavLink>
                        </li>



                        {/* shared nav links */}

                        <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
                        <li className="flex items-center gap-2">
                            <FaHome></FaHome>
                            <NavLink to="/">

                                Home </NavLink>
                        </li>






                        <li className="flex items-center gap-2" >
                            <FaLock></FaLock>
                            <NavLink to="/order/contact">

                                Log Out</NavLink>
                        </li>




                    </ul></div>}
                {role === 'admin' && <div><ul className=" pl-4 space-y-5  ">


                    <li className="flex items-center gap-2">
                        <FaHome></FaHome>
                        <NavLink to="/dashboard/userHome">

                            Newsletter Subscribers</NavLink>

                    </li>
                    <li className="flex items-center gap-2">
                        <FaCalendar></FaCalendar>
                        <NavLink to="/dashboard/history">

                            All Trainers</NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaShoppingCart></FaShoppingCart>
                        <NavLink to="/dashboard/cart">

                            Applied Trainers </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaShoppingCart></FaShoppingCart>
                        <NavLink to="/dashboard/cart">

                            Balance </NavLink>
                    </li>
                    <li className="flex items-center gap-2">
                        <FaShoppingCart></FaShoppingCart>
                        <NavLink to="/dashboard/addClasses">

                            Add New Class </NavLink>
                    </li>



                    {/* shared nav links */}

                    <div className="w-52 h-[2px] bg-black my-6 text-center"></div>
                    <li className="flex items-center gap-2">
                        <FaHome></FaHome>
                        <NavLink to="/">

                            Home </NavLink>
                    </li>






                    <li className="flex items-center gap-2" >
                        <FaLock></FaLock>
                        <NavLink to="/order/contact">

                            Log Out</NavLink>
                    </li>




                </ul></div>}

            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>

    );
};

export default Dashboard;