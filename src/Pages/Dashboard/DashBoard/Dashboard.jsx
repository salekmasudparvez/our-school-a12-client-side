import { Icon } from "@iconify/react/dist/iconify.js";
import { NavLink } from "react-router-dom";
import Logo from "../../Shared/Navbar/Logo";


const Dashboard = () => {
    return (
        <>  
            <div className="relative">
            <div className="w-full h-16 flex justify-center border-b border-b-second border-opacity-35 shadow-md items-center"><Logo></Logo></div>
                <div className="md:flex hidden absolute top-0">

                    <div className="flex flex-col items-center p-4 w-60 h-screen z-10 bg-white gap-5 border shadow-md">
                        <div className="text-xl font-bold text-first flex justify-center items-center gap-2">
                            <Icon icon="akar-icons:dashboard" />
                            <h1 className="text-second">Dashboard</h1>
                        </div>
                        {/* Sidebar content here */}
                        <div className="flex flex-col text-second justify-between items-center h-full">
                            <div className="flex flex-col gap-4">
                                <a><NavLink >Sidebar Item 1</NavLink></a>
                                <a><NavLink>Sidebar Item 1</NavLink></a>
                                <a><NavLink>Sidebar Item 1</NavLink></a>

                            </div>
                            <div>
                                <a className="flex items-center justify-center gap-2"><Icon icon="material-symbols:logout" /> Logout</a>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
        </>

    );
};

export default Dashboard;