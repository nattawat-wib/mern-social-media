import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const PublicLayout = () => {
    const location = useLocation();
    const { auth } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const restrictAfterLoginPathList = ['/Login', '/Login/', '/login', '/login/', '/forget-password', '/forget-password/', '/reset-password', '/reset-password/']

        if (restrictAfterLoginPathList.includes(location.pathname)) {
            console.log('in restrict', auth);
            if (auth.auth) {
                navigate('/');
            }
        }

    }, [location, auth])

    return <Outlet />
}

export default PublicLayout