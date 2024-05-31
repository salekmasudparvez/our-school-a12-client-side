import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { useState } from "react";


const Main = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Navbar open={open} setOpen={setOpen}/>
           <div onClick={()=>setOpen(false)} className="min-h-[calc(100vh-300px)]">
           <Outlet/>
           </div>
            <Footer/>
        </div>
    );
};

export default Main;