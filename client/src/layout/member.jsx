import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, beforeAuthPage } from '../context/auth-context';

import Navbar from './../components/navbar';
import Footer from './../components/footer';

const MemberLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useAuth();

    useEffect(() => {
        if (!auth?.isAuth && !beforeAuthPage.includes(location.pathname)) {
            console.log('member auth?.isAuth', auth?.isAuth);
            console.log("member location.pathname", location.pathname);
            navigate('/login');
        }
    }, [location, auth])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MemberLayout