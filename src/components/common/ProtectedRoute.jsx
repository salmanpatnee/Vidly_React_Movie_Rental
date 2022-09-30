import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../services/AuthService';

const ProtectedRoute = ({children}) => {
    const location =  useLocation();
    console.log(location);

    const user = auth.getCurrrentUser(); 
    return user && user.is_admin ? children  : <Navigate to="/login" replace={false} state={{from: '/movie123'}} />;
}
 
export default ProtectedRoute;