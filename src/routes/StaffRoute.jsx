import React from 'react';

import LoadingSpinner from '../Component/LoadingSpinner/LoadingSpinner';
import Forbidden from '../Component/forbidden/Forbidden';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRoll';


const StaffRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const { role, roleLoading, } = useRole()

    if (loading || !user || roleLoading) {
        return <LoadingSpinner/>
    }
    if (role !== 'staff') {
        return <Forbidden></Forbidden>
    }   
    return children
};

export default StaffRoute;