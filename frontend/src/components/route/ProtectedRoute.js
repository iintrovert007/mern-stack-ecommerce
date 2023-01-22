import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({children}){

    const {isAuthenticated} =    useSelector((state) => state.productsState)
    
    if(!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return children;
}