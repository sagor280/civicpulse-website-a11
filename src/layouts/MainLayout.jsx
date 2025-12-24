import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../pages/Shared/Navber/Navber';
import Footer from '../pages/Shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='max-w-7xl  mx-auto'>
            <Navber></Navber>
            <Outlet></Outlet>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;