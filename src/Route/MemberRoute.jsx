/* eslint-disable react/prop-types */
import { Navigate, useLocation} from "react-router-dom";


import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

import LoadingSpinner from "../Components/Shared/LoadingSpinner";

import useRole from "../hooks/useRole";


const MemberRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [role,isLoading]=useRole()
    const location=useLocation()
    console.log(user,loading)

   
    
    //const location = useLocation();

    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && role==='member') {
        return children;
    }

    return <Navigate to="/dashboard" state={{from:location}}></Navigate>

};

export default MemberRoute; 