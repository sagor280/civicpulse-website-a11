import React from 'react';
import LoadingSpinner from '../Component/LoadingSpinner/LoadingSpinner';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRoll';
import Forbidden from '../Component/forbidden/Forbidden';

const UserRoute = ({ children}) => {
    const { loading, user } = useAuth();
    const { role, roleLoading, } = useRole()
    if (loading || !user || roleLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }
    if (role !== 'citizen') {
        return <Forbidden></Forbidden>
    } 
    
    return children
};

export default UserRoute;