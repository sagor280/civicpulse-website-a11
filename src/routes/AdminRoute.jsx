import React from 'react';

import Forbidden from '../Component/forbidden/Forbidden';
import LoadingSpinner from '../Component/LoadingSpinner/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRoll';


const AdminRoute = ({ children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading, } = useRole()
    if (loading || !user || roleLoading) {
        return <LoadingSpinner/>
    }
    if (role !== 'admin') {
        return <Forbidden></Forbidden>
    } 
    return children
};

export default AdminRoute;