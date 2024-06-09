
import { Icon } from '@iconify/react';
import NavItem from './NavItem';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import useAuth from '../../../Hook/useAuth';
import useRole from '../../../Hook/useRole';

const Navbar = ({ open, setOpen }) => {
    const {user,LogOutUser}=useAuth();
    const [role]=useRole();
    const navItems = <>
        <NavItem name="Home" path='/' />
        <NavItem name="Contact" path='/contact' />
        {user?"":<> <NavItem name="Sing up" path='singup' />
        <NavItem name="Sing in" path='singin' /></>
       }
    </>
   

    const dashboardItem = <div className='dropdown-content bg-white bg-opacity-50 border w-52 mt-3 rounded text-center flex flex-col p-2'>
        <a ><NavLink  className={({ isActive }) => isActive ? 'text-white md:inline  block bg-first p-2' : 'p-2 hover:bg-first block hover:text-white'} to={`${role === "Student" ? '/dashboard' : role === "Teacher" ? '/dashboard/tutor' : '/dashboard/admin'}`}>Dashboard</NavLink></a>
        <button onClick={LogOutUser} className='p-2 hover:bg-first block hover:text-white'>Log out</button>
    </div>
    return (
        <>
            <nav className="flex bg-white bg-opacity-40 fixed top-0 z-20 w-full border gap-4 justify-between items-center min-h-[74px] mx-auto md:px-10 px-4">
                {/* hambarger */}
                <div onClick={() => setOpen(!open)} className='  md:hidden w-10 text-2xl'>
                    {open ? <Icon icon="akar-icons:cross" /> : <Icon icon="fe:bar" />}
                </div>
                {/* Logo part */}
                <Logo css="md:w-[30%] w-fit  "/>
                <div className='md:flex   hidden w-[40%] text-second justify-center items-center gap-3'>
                    {navItems}
                </div>
               {user &&  <div className='md:w-[30%] w-fit  flex text-second justify-end items-center'>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Unknown" src={user?.photoURL?user?.photoURL:"https://i.ibb.co/Qr9pWXJ/unknown.webp"} />
                            </div>
                        </div>
                        {dashboardItem}
                    </div>
                </div>}

            </nav>
            {open && <div className='md:hidden z-[10] bg-white bg-opacity-60 text-center flex flex-col border border-second border-opacity-50 shadow-md w-full fixed top-0 mt-[74px] justify-start p-3 rounded  gap-1'>
                {navItems}
            </div>}
        </>
    );
};
Navbar.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}
export default Navbar;