/* eslint-disable react/prop-types */
import { Navigate} from "react-router-dom";


import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";


const TrainerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
   
    const [role,isLoading]=useRole()
    console.log(role)
    //const location = useLocation();

    if (loading || isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && role==='trainer') {
        return children;
    }

    return <Navigate to="/dashboard"></Navigate>

};

export default TrainerRoute;