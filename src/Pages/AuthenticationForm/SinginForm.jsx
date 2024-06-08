import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from "../../Hook/useAuth";
import axios from "axios";

const SinginForm = () => {
    const [pass, setPass] = useState("password");
    const { user, signInWithPassword,creatUserGoogle,creatUserGithub } = useAuth();
    const [singinLoading, setSinginLoading] = useState(false);
    const navigate = useNavigate()

    const handleSingin =async (e) => {
        e.preventDefault();
        setSinginLoading(true)
        const form = e.target
        const email = form.floating_email.value;
        const password = form.floating_password.value;

        if (user?.email === email) {
            return toast.error("User already exist")
        }

        try {
            const result = await signInWithPassword(email, password)
            if (result) {
                toast.success('Log in successful');
                setSinginLoading(false)
                navigate('/')
            }
          
        } catch (error) { 
            setSinginLoading(false)
            toast.error('Invaild email or password')

        }
    }
    const handleGoogleSingUp =  () => {

        creatUserGoogle()
        .then(res=>{
            console.log(res)
            const newUserData = { name:res?.user?.displayName, email:res?.user?.email, role:"Student" };
             axios.post('http://localhost:5000/users', newUserData)
            toast.success('Successfully created Account')
            navigate('/')
        })
       
    }
    const handleGithubSingUp = async () => {

        
        creatUserGithub()
        .then(res=>{
            console.log(res)
            const newUserData = { name:res?.user?.displayName, email:res?.user?.email, role:"Student" };
             axios.post('http://localhost:5000/users', newUserData)
            toast.success('Successfully created Account')
            navigate('/')
        })

    }
    return (

        <div className="hero-content  min-h-screen w-full gap-0  p-0 flex-col lg:flex-row-reverse">
            <div className="text-center hidden  lg:flex p-4  bg-[url('https://i.ibb.co/MhWJwLX/freepik-export-20240601155805-J2-CM.jpg')] bg-no-repeat bg-contain bg-center h-screen w-1/2 rounded-md   lg:text-left">
                <button className="text-xl btn hover:bg-first absolute top-1 right-1 ">
                    <Link className="flex justify-center gap-1 items-center text-gray-700 hover:text-white" to='/'>
                        <Icon icon="grommet-icons:logout" />
                        <span>Back to home</span>
                    </Link>
                </button>
            </div>
            <div className=" lg:w-1/2 w-full px-4 gap-6  h-full flex flex-col justify-center min-w-64">
                <button className="text-base lg:hidden flex absolute top-1 left-1 btn hover:bg-first  ">
                    <Link className="flex justify-center gap-1 items-center text-gray-700 hover:text-white" to='/'>
                        <Icon icon="grommet-icons:logout" />
                        <span>Back to home</span>
                    </Link>
                </button>
                <div className="md:text-5xl text-3xl text-center text-first ">Sing in now!</div>
                <form onSubmit={handleSingin} className="flex flex-col gap-6 w-full border-2 border-opacity-40  mx-auto md:p-10 p-4 rounded bg-white">

                    <div className="relative z-0 w-full  group">
                        <input
                            type="email"
                            name="floating_email"
                            id="floating_email"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Email address
                        </label>
                    </div>



                    <div className="relative z-0 w-full  group">
                        <input
                            type={pass}
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <div className="absolute top-0 right-0 px-4 text-xl">
                            {pass === "password" ?
                                <button onClick={() => setPass("text")}> <Icon icon="heroicons-outline:eye-off" /></button>
                                :
                                <button onClick={() => setPass("password")}> <Icon icon="simple-line-icons:eye" /></button>}
                        </div>
                        <label
                            htmlFor="floating_password"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Password
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="text-white bg-first hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                       {singinLoading?<Icon className="text-3xl animate-spin mx-auto" icon="solar:black-hole-3-line-duotone" />:"Sing in"}
                       
                    </button>
                </form>
                <div className="text-center">
                    <h3>Don&apos;t have any account? please<Link to="/singup" className="btn btn-link px-0">Sing up</Link></h3>
                </div>
                <div className="divider">Or</div>
                <button onClick={handleGoogleSingUp} type="button" className="flex btn items-center justify-center w-full hover:bg-first hover:text-white space-x-2 border rounded-md ">
                    <span className="text-4xl"> <Icon icon="flat-color-icons:google" /></span>
                    <p>Sing up with Google</p>
                </button>
                <button onClick={handleGithubSingUp} type="button" className="flex btn items-center justify-center mb-10 w-full hover:bg-first hover:text-white space-x-2 border rounded-md ">
                    <span className="text-4xl"> <Icon icon="devicon:github" /></span>
                    <p>Sing up with Github</p>
                </button>
            </div>
        </div>
    );
};

export default SinginForm;