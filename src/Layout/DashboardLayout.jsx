import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import Logo from "../Pages/Shared/Navbar/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";


const DashboardLayout = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative">
            {/* for phone views */}
            <nav className="flex md:hidden bg-white bg-opacity-40 fixed top-0 z-20 w-full border justify-between items-center min-h-[74px] mx-auto md:px-10 px-4">
                {/* hambarger */}
                <div onClick={() => setOpen(!open)} className=' md:hidden w-10 text-2xl'>
                    {open ? <Icon icon="akar-icons:cross" /> : <Icon icon="fe:bar" />}
                </div>
                {/* Logo part */}
                <Logo css="md:w-[30%] " />

            </nav>
            {open && <div className='md:hidden z-[10] bg-white bg-opacity-60 text-center flex flex-col border border-second border-opacity-50 shadow-md w-full fixed top-0 mt-[74px] justify-start p-3 rounded  gap-1'>
                <Sidebar />
            </div>}
            <div className="md:flex hidden absolute top-0">

                <div className="flex flex-col items-center p-4 w-60 h-screen z-10 bg-white gap-5 border shadow-md">
                    <div className="border">
                        <Logo />
                    </div>
                    {/* Sidebar content here */}
                    <Sidebar />

                </div>
                <div className=" bg-orange-400">
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;