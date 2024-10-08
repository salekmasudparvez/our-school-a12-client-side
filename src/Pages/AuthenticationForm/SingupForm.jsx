import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from './../../Hook/useAuth';
import axios from "axios";


const SingupForm = () => {
    const { creatUserPassword, updateUserProfile, creatUserGoogle, setUser, user, creatUserGithub } = useAuth()
    const [role, setRole] = useState("null");
    const navigate = useNavigate()
    const [singupLoading, setSingupLoading] = useState(false);
    const location = useLocation();
    // console.log(location.state.pathname)

    const handleSingup = async (e) => {
        e.preventDefault()
        setSingupLoading(true)
        if (role === "null") {
            return toast.error("Role is required")
        }
        const form = e.target
        const name = form.floatingName.value;
        const email = form.floating_email.value;
        const password = form.floating_password.value;

        if (!/.{6,}/.test(password)) {
            return toast.error("Password must be at least 6 characters");
        }
        if (user?.email === email) {
            return toast.error("User already exist")
        }


        const result = await creatUserPassword(email, password);
        await updateUserProfile(name);
        setUser({ ...result?.user, displayName: name })
        const newUserData = { name, email, role ,image:user?.photoURL||"https://i.ibb.co/t3n0XR7/240.jpg" };
        await axios.post('https://server-study.vercel.app/users', newUserData)

        toast.success('Successfully created Account')
        setSingupLoading(false)
        navigate(`${location.state.pathname ? location.state.pathname :'/'}`)


    }
    const handleGoogleSingUp = () => {

        creatUserGoogle()
            .then(res => {
                console.log(res)
                const newUserData = { name: res?.user?.displayName, email: res?.user?.email, role: "Student" };
                axios.post('https://server-study.vercel.app/users', newUserData)
                toast.success('Successfully created Account')
                navigate(`${location.state.pathname ? location.state.pathname :'/'}`)
            })

    }
    const handleGithubSingUp = async () => {


        creatUserGithub()
            .then(res => {
                console.log(res)
                const newUserData = { name: res?.user?.displayName, email: res?.user?.email, role: "Student" };
                axios.post('https://server-study.vercel.app/users', newUserData)
                toast.success('Successfully created Account')
                navigate(`${location.state.pathname ? location.state.pathname :'/'}`)
            })

    }
    return (

       <div className="bg-white">
         <div className="hero-content bg-white  min-h-screen w-full items-start gap-0   p-0 flex-col lg:flex-row">
            <div className="text-center hidden lg:flex w-1/2 rounded-md   lg:text-left">
                <img className=" w-full" src="https://i.ibb.co/jL79g0F/lovely-hand-drawn-education-cocept.png" alt="book" />
                <button className="text-xl border hover:bg-first p-2 hover:text-white focus:border-b-black rounded absolute btn  top-1 right-1 bg-white">
                    <Link className="flex justify-center bg-transparent gap-1 items-center text-gray-700 hover:text-white" to='/'>
                        <Icon icon="grommet-icons:logout" />
                        <span>Back to home</span>
                    </Link>
                </button>
            </div>
            <div className=" lg:w-1/2 w-full max-w-lg mx-auto px-4 gap-3 h-full my-10 flex flex-col justify-center min-w-64">
                <button className="text-base lg:hidden rounded btn-sm flex absolute top-1 left-1 bg-white btn hover:bg-first   ">
                    <Link className="flex justify-center gap-1 items-center bg-transparent text-gray-700 hover:text-white" to='/'>
                        <Icon icon="grommet-icons:logout" />
                        <span>Back to home</span>
                    </Link>
                </button>
                <div className="md:text-5xl text-3xl text-center py-3 text-first">Sing up now!</div>
                <form onSubmit={handleSingup} className="flex flex-col gap-6 w-full border-2 border-opacity-40  mx-auto md:p-10 p-4 rounded bg-white">
                    <div className="relative z-0 w-full  group">
                        <input
                            type="text"
                            name="floatingName"
                            id="floatingName"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />

                        <label
                            htmlFor="floatingName"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Name
                        </label>
                    </div>
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
                    <div className=" z-0 w-full group">
                        <select onChange={(e) => setRole(e.target.value)} className="select bg-white border border-gray-500 focus:border-none select-bordered w-full">
                            <option disabled selected>Role</option>
                            <option value="Student">Student</option>
                            <option value="Teacher">Teacher</option>
                            <option disabled >Admin</option>
                        </select>
                    </div>


                    <div className="relative z-0 w-full  group">
                        <input
                            type="password"
                            name="floating_password"
                            id="floating_password"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />

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
                        {singupLoading ? <Icon className="text-3xl animate-spin mx-auto" icon="solar:black-hole-3-line-duotone" /> : "Sing up"}

                    </button>
                </form>
                <div className="text-center text-gray-700">
                    <h3>Already have an account? please<Link to="/singin" className="btn btn-link px-0">Sing in</Link></h3>
                </div>
                <div className="divider p-0">Or</div>
                <button onClick={handleGoogleSingUp} type="button" className="flex bg-white text-gray-700 btn items-center justify-center w-full hover:bg-first hover:text-white space-x-2 border rounded-md ">
                    <span className="text-4xl"> <Icon icon="flat-color-icons:google" /></span>
                    <p>Sing up with Google</p>
                </button>
                <button onClick={handleGithubSingUp} type="button" className="flex text-gray-700 bg-white btn items-center justify-center mb-10 w-full hover:bg-first hover:text-white space-x-2 border rounded-md ">
                    <span className="text-4xl"> <Icon icon="devicon:github" /></span>
                    <p>Sing up with Github</p>
                </button>
            </div>

        </div>
       </div>

    )
};

export default SingupForm;