
import NavItem from './NavItem';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import useAuth from '../../../Hook/useAuth';
import useRole from '../../../Hook/useRole';
import { Turn as Hamburger } from 'hamburger-react'

const Navbar = ({ open, setOpen }) => {
    const { user, LogOutUser } = useAuth();
    const [role] = useRole();
    const navItems = <>
        <NavItem name="Home" path='/' />
        <NavItem name="Contact" path='/contact' />
        {user ? "" : <> <NavItem name="Sing up" path='singup' />
            <NavItem name="Sing in" path='singin' /></>
        }
    </>


    const dashboardItem = <div className='dropdown-content bg-white bg-opacity-50 border w-52 mt-3 rounded text-center flex flex-col p-2'>
        <a ><NavLink className={({ isActive }) => isActive ? 'text-white md:inline  block bg-first p-2' : 'p-2 hover:bg-first block hover:text-white'} to={`${role === "Student" ? '/dashboard' : role === "Teacher" ? '/dashboard/tutor' : '/dashboard/admin'}`}>Dashboard</NavLink></a>
        <button onClick={LogOutUser} className='p-2 hover:bg-first block hover:text-white'>Log out</button>
    </div>
    return (
        <>
            <nav className="flex  backdrop-blur-md  bg-opacity-40  fixed top-0 z-20 w-full border gap-4 justify-between items-center min-h-[74px] mx-auto md:px-10 px-4">
                {/* hambarger */}
                <div className='  md:hidden w-10 text-2xl'>
                    <Hamburger toggled={open} toggle={setOpen}></Hamburger>
                </div>
                {/* Logo part */}
                <Logo css="md:w-[30%] w-fit  " />
                <div className='md:flex hidden w-[40%] text-second justify-center items-center gap-3'>
                    {navItems}
                </div>
                {user && <div className='md:w-[30%] w-fit backdrop-blur-md   flex text-second justify-end items-center'>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Unknown" src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/t3n0XR7/240.jpg"} />
                            </div>
                        </div>
                        {dashboardItem}
                    </div>
                </div>}

            </nav>
            <div
                className={`md:hidden z-[10] backdrop-blur-md text-center flex flex-col border border-second border-opacity-50 shadow-md w-full fixed top-0 mt-[74px] justify-start p-3 rounded gap-1 transition-opacity duration-300 ease-in-out ${open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
                    }`}
            >
                {navItems}
            </div>

        </>
    );
};
Navbar.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
}
export default Navbar;