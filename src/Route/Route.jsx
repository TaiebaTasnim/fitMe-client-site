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
                  element:<TrainerDetails></TrainerDetails>,
                 
            },
            {
                  path:"/community",
                  element:<AllClasses></AllClasses>,
                 
            },

        ]
      },
      {
            path:"dashboard",
            element:<Dashboard></Dashboard>,
            errorElement:<ErrorPage></ErrorPage>,
            children:[
                  {
                        path:'beTrainer',
                        element:<TrainerForm></TrainerForm>
                  },
                  {
                        path:'addClasses',
                        element:<AddClassForm></AddClassForm>
                  },
                  {
                        path:'subscribers',
                        element:<Subscribers></Subscribers>
                  },
                  {
                        path:'profile',
                        element:<ProfilePage></ProfilePage>
                  },
            ]
      }
])
export default Route
