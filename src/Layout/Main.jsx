import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";
import { useEffect, useState } from "react";
import useAuth from "../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";


const Main = () => {
    const [open, setOpen] = useState(false);
    const {user} =useAuth()
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        if(user){
            setLoading(false)
        }else{
            setLoading(false)
        }
    },[user])
    
    if(loading){
        return (<div className="flex justify-center items-center w-full min-h-screen">
            <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
        />
        </div>)
    }
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