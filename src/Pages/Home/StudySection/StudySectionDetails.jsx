import { Icon } from "@iconify/react/dist/iconify.js";
import Reviewcard from "./Reviewcard";


const StudySectionDetails = () => {
    return (
        <section className=" text-second py-[75px]">
            <div className="flex flex-col lg:flex-row  border-2 border-second border-opacity-50 px-3 max-w-6xl  p-6 mx-auto">
                <a rel="noopener noreferrer" href="#" className="block  gap-3 w-full lg:w-1/2  ">
                    <img src="https://source.unsplash.com/random/480x360" alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 " />
                </a>
                <div className="p-6 lg:w-1/2 h-full space-y-2 rounded-sm flex flex-col justify-center w-full items-center">
                    <h3 className="text-2xl font-semibold sm:text-4xl">Session title</h3>
                    <div className="flex justify-between w-full items-center">
                        <div className="text-sm text-gray-400">Tutor:Jone doe</div>
                        <span className="text-yellow-500 flex justify-center items-center gap-2">4<Icon icon="teenyicons:star-solid" /></span> </div>
                    <p>Session description</p>
                    <div className="border w-full p-2 rounded space-y-4">
                        <p className="text-xs text-gray-500">Duration Of Registration :(11/21/2121-11/2/2323) </p>
                        <div className="flex justify-between text-xs text-gray-500 items-center">
                            <p>Class Start:(11/21/2121)</p>
                            <p>End:(11/21/2121)</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xs text-gray-500">Session Duration :2hr</p>
                            <p className="text-xs text-red-500">Registration fee :$400</p>
                        </div>


                        <div><a className="btn btn-block btn-outline hover:bg-first hover:text-white rounded-sm">Book Now</a></div>
                    </div>
                </div>


            </div>
            <div>
                <h1 className=" text-center md:py-8 py-4 md:text-5xl text-3xl font-bold text-first"> Review of this session</h1>
            </div>
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-3">
                <Reviewcard />
                <Reviewcard />
                <Reviewcard />
            </div>
        </section>
    );
};

export default StudySectionDetails;