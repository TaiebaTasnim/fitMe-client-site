/* eslint-disable react/prop-types */
import { Navigate, useLocation} from "react-router";

import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    //console.log(user,loading)
    const location=useLocation()
    

    if(loading){
      
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from:location}} ></Navigate>
};

export default PrivateRoute;