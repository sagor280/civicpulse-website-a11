import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../pages/Shared/Navber/Navber';

const MainLayout = () => {
    return (
        <div className='max-w-7xl  mx-auto'>
            <Navber></Navber>
            <Outlet></Outlet>
           
        </div>
    );
};

export default MainLayout;