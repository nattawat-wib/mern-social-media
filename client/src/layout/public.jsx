import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth, beforeAuthPage } from '../context/auth-context';

const PublicLayout = () => {
    const location = useLocation();
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth?.isAuth && beforeAuthPage.includes(location.pathname)) {
            console.log('public auth?.isAuth', auth?.isAuth);
            console.log("public location.pathname", location.pathname);
            navigate('/');
        }
    }, [location, auth])

    return <Outlet />
}

export default PublicLayout