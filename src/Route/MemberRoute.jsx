/* eslint-disable react/prop-types */
import { Navigate} from "react-router-dom";


import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";


const MemberRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
   
    const [role]=useRole()
    //const location = useLocation();

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user && role==='member') {
        return children;
    }

    return <Navigate to="/dashboard"></Navigate>

};

export default MemberRoute; 