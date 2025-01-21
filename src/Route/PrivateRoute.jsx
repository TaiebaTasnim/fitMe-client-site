/* eslint-disable react/prop-types */
import { Navigate} from "react-router";

import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    

    if(loading){
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" ></Navigate>
};

export default PrivateRoute;