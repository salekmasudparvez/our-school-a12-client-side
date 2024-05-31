
import { Icon } from '@iconify/react';
import NavItem from './NavItem';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

const Navbar = ({ open, setOpen }) => {

    const navItems = <>
        <NavItem name="Home" path='/' />
        <NavItem name="About" path='/about' />
        <NavItem name="Contact us" path='/contact' />
    </>
    const dashboardItem = <div className='dropdown-content border w-52 mt-3 rounded flex flex-col p-2'>
        <a ><NavLink className={({ isActive }) => isActive ? 'text-white md:inline  block bg-first p-2' : 'p-2 hover:bg-first block hover:text-white'} to='dashboard'>Dashboard</NavLink></a>
        <a className='p-2 hover:bg-first block hover:text-white'>Log out</a>
    </div>
    return (
        <>
            <nav className="flex border justify-between items-center min-h-[74px] max-w-6xl mx-auto md:px-10 px-4">
                {/* hambarger */}
                <div onClick={() => setOpen(!open)} className=' md:hidden w-10 text-2xl'>
                    {open ? <Icon icon="akar-icons:cross" /> : <Icon icon="fe:bar" />}
                </div>
                {/* Logo part */}
                <Logo css="md:w-[30%] "/>
                <div className='md:flex hidden w-[40%] text-second justify-center items-center gap-3'>
                    {navItems}
                </div>
                <div className='md:w-[30%] flex text-second justify-end items-center'>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        {dashboardItem}
                    </div>
                </div>

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