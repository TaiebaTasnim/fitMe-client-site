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
            ]
      }
])
export default Route
