import {
      createBrowserRouter,
      
    } from "react-router-dom";
import Root from "../MainLayout/Root";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Dashboard from "../MainLayout/Dashboard";
import Register from "../Pages/register";
import Login from "../Pages/login";
import { TrainerForm } from "../Pages/Member/TrainerForm";
import AddClassForm from "../Pages/Admin/AddClassForm";
import AllClasses from "../Pages/PublicPage/AllClasses";
import AllTrainers from "../Pages/PublicPage/AllTrainers";
import TrainerDetails from "../Pages/PrivatePage/TrainerDetails";
import Subscribers from "../Pages/Admin/Subscribers";
import ProfilePage from "../Pages/Member/ProfilePage";
import ActivityLog from "../Pages/Member/ActivityLog";
import AppliedTrainers from "../Pages/Admin/AppliedTrainers";
import AppliedTrainerDetails from "../Pages/Admin/AppliedTrainerDetails";
import VerifiedTrainers from "../Pages/Admin/VerifiedTrainers";
import AddNewForum from "../Pages/Admin/AddNewForum";
import Forum from "../Pages/PublicPage/Forum";
import TrainerBookedPage from "../Pages/PrivatePage/TrainerBookedPage";
import Payment from "../Pages/PrivatePage/Payment";
import BookedTrainer from "../Pages/Member/BookedTrainer";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import MemberRoute from "./MemberRoute";
import ForumDetails from "../Pages/PublicPage/ForumDetails";
import TrainerRoute from "./TrainerRoute";
import AddForum from "../Pages/Trainer/AddForum";
import ManageSlots from "../Pages/Trainer/ManageSlots";
import AddNewSlot from "../Pages/Trainer/AddNewSlot";



const Route = createBrowserRouter([
      {
        path: "/",
        element: <Root></Root>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                  path:"/",
                  element:<Home></Home>,
                 
            },
            {
                  path:"/register",
                  element:<Register></Register>,
                 
            },
            {
                  path:"/login",
                  element:<Login></Login>,
                 
            },
            {
                  path:"/allClasses",
                  element:<AllClasses></AllClasses>,
                 
            },
            {
                  path:"/allTrainers",
                  element:<AllTrainers></AllTrainers>,
                 
            },
            {
                  path:"/trainerDetails/:trainerId",
                  element:<PrivateRoute><TrainerDetails></TrainerDetails></PrivateRoute>,
                 
            },
            {
                  path:"/forum",
                  element:<Forum></Forum>,
                 
            },
            {
                  path:"/forumDetails/:forumId",
                  element:<ForumDetails></ForumDetails>,
                 
            },
            {
                  path:"/trainerBooked/:index/:id",
                  element:<PrivateRoute><TrainerBookedPage></TrainerBookedPage></PrivateRoute>,
                 
            },
            {
                  path:"/payment/:index/:id/:pkgId",
                  element:<PrivateRoute><Payment></Payment></PrivateRoute>,
                 
            },


        ]
      },
      {
            path:"dashboard",
            element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
            errorElement:<ErrorPage></ErrorPage>,
            children:[
                  {
                        path:'beTrainer',
                        element:<MemberRoute><TrainerForm></TrainerForm></MemberRoute>
                  },
                  {
                        path:'addClasses',
                        element:<AdminRoute><AddClassForm></AddClassForm></AdminRoute>
                  },
                  {
                        path:'subscribers',
                        element:<AdminRoute><Subscribers></Subscribers></AdminRoute>
                  },
                  {
                        path:'profile',
                        element:<MemberRoute><ProfilePage></ProfilePage></MemberRoute>
                  },
                  {
                        path:'activityLog',
                        element:<MemberRoute><ActivityLog></ActivityLog></MemberRoute>
                  },
                  {
                        path:'appliedTrainers',
                        element:<AdminRoute><AppliedTrainers></AppliedTrainers></AdminRoute>
                  },
                  {
                        path:'appliedTrainerDetails/:email',
                        element:<AdminRoute><AppliedTrainerDetails></AppliedTrainerDetails></AdminRoute>
                  },
                  {
                        path:'verifiedTrainers',
                        element:<AdminRoute><VerifiedTrainers></VerifiedTrainers></AdminRoute>
                  },
                  {
                        path:'addForumAdmin',
                        element:<AdminRoute><AddNewForum></AddNewForum></AdminRoute>
                  },
                  {
                        path:'addForumTrainer',
                        element:<TrainerRoute><AddForum></AddForum></TrainerRoute>
                  },
                  {
                        path:'manageSlots',
                        element:<TrainerRoute><ManageSlots></ManageSlots></TrainerRoute>
                  },
                  {
                        path:'addSlot',
                        element:<TrainerRoute><AddNewSlot></AddNewSlot></TrainerRoute>
                  },
                  {
                        path:'bookedTrainer/:email',
                        element:<MemberRoute><BookedTrainer></BookedTrainer></MemberRoute>
                  },
            ]
      }
])
export default Route
