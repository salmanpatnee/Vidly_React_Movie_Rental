import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../services/AuthService';

const ProtectedRoute = ({children}) => {
    const user = auth.getCurrrentUser(); 
    return user && user.is_admin ? children  : <Navigate to="/login" replace={true} state={{from: '/movies'}} />;
    
}
 
export default ProtectedRoute;