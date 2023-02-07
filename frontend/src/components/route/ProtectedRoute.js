import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import Loader from '../layouts/Loader';

export default function ProtectedRoute ({children}) {
    const { isAuthenticated, loading } = useSelector(state => state.authState)
    const navigate = useNavigate();
    useEffect(() => {
      
    },[isAuthenticated,loading])
   
    
    
    
    if(isAuthenticated) {
        return children;
    }
    
    if(loading) {
        return <Loader/>
    }
    if(!loading & !isAuthenticated ) {
        return <Navigate to="/" />
    }
    

   
}