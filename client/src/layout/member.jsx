import { Outlet } from 'react-router-dom';
import Navbar from './../components/navbar';
import Footer from './../components/footer';

const MemberLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default MemberLayout