import React from 'react';
import Navbar from '../CommonPages/Navbar';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';
import Footer from '../CommonPages/Footer';
import { useEffect } from 'react';

const DashboardLayout = () => {
    const {pathname}=useLocation()
    useEffect(()=>{
        window.scrollTo(0,0)
    },[pathname])
    // const spinner=useNavigation()
    return (
        <div>
            <Navbar></Navbar>
            <div className=' min-h-[calc(100vh-305px)]'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;