import { Icon } from "@iconify/react/dist/iconify.js";
import Reviewcard from "./Reviewcard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useRole from "../../../Hook/useRole";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";
import {
    useLoaderData,
} from "react-router-dom";
import { isBefore } from "date-fns";


const StudySectionDetails = () => {
    const { user } = useAuth()
    const [role] = useRole();
    const [bookLoading, setBookLoading] = useState(false);
    const [btnValue, setbtnValue] = useState(true);
    
    const getId = useParams();
    const session = useLoaderData();
    // getsingle sessions data

    const { SessionTitle, TutorName, SessionDescription, RegistrationStartDate, RegistrationEndDate, ClassStartDate, ClassEndDate, SessionDuration, RegistrationFee, _id } = session || {};

    useEffect(() =>{
        if(isBefore(new Date,ClassEndDate)){
            setbtnValue(false)
        }else{
            setbtnValue(true)
        }
    },[ClassEndDate])
    

    //it is use for btn disable
    const { refetch, isPending, data: booked } = useQuery({
        queryKey: ['bookedSessions'],
        queryFn: async () => {
            const response = await axios.get(`https://server-study.vercel.app/bookedsessions?email=${user.email}&id=${getId.id}`);
            const data = response.data;
            console.log(data)
            return data;
        }
    })
    // get reciews
    const { data: reviews } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const response = await axios.get(`https://server-study.vercel.app/reviews/${getId.id}`);
            const data = response.data;

            return data;
        }
    })





    //post data to bookedsession
    const handleBook = async (_id) => {
        setBookLoading(true)
        if (booked.length > 0) {
            toast.error('You have already booked this session')
            setBookLoading(false)
            return;
        }
        const sessionData = {
            SessionTitle,
            TutorName,
            SessionDescription,
            RegistrationStartDate,
            RegistrationEndDate,
            ClassStartDate,
            ClassEndDate,
            SessionDuration,
            RegistrationFee,
            BookId: _id,
            studentEmail: user?.email,
        }
        axios.post('https://server-study.vercel.app/bookedsession', sessionData)
            .then(res => {
                console.log(res)
                setBookLoading(false)
                refetch()
                toast.success('Booked session Successfully')
            })

    }
    const { isLoading: LoadingMaterial, data: Material } = useQuery({
        queryKey: 'allMaterials',
        queryFn: async () => {
            const res = await axios(`https://server-study.vercel.app/singleMaterial/${_id}`)
            const data = await res.data
            return data
        }
    })
    //console.log(Material)

    if (!user || LoadingMaterial ||isPending) {
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
        <section className=" text-second py-[75px]">
            <div className="flex flex-col lg:flex-row justify-end items-center  px-3 max-w-6xl  p-6 mx-auto">
                <a rel="noopener noreferrer" className={`${Material.imageUrl ? "block" : "hidden"}  gap-3 w-full lg:w-1/2`}>
                    <img src={Material?.imageUrl} alt="" className="object-cover w-full h-full rounded " />
                </a>
                <div className="p-6 max-w-xl mx-auto h-full space-y-2 rounded-sm flex flex-col justify-center w-full items-center">
                    <h3 className="text-2xl font-semibold sm:text-4xl">{SessionTitle}</h3>
                    <div className="flex justify-between w-full items-center">
                        <div className="text-sm text-gray-400">Tutor:{TutorName}</div>
                        <span className="text-yellow-500 flex justify-center items-center gap-2">4<Icon icon="teenyicons:star-solid" /></span> </div>
                    <p>{SessionDescription}</p>
                    <div className="border w-full p-2 rounded space-y-4">
                        <p className="text-xs text-gray-500">Duration Of Registration :({RegistrationStartDate}-{RegistrationEndDate}) </p>
                        <div className="flex justify-between text-xs text-gray-500 items-center">
                            <p>Class Start:({ClassStartDate})</p>
                            <p>End:({ClassEndDate})</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-xs text-gray-500">Session Duration :{SessionDuration}</p>
                            <p className="text-xs text-red-500">Registration fee :{RegistrationFee !==0 && <span>$</span>}{RegistrationFee===0?'Free':RegistrationFee}</p>
                        </div>

                       
                          { Material && <div className="whitespace-nowrap flex justify-between px-2 py-1 items-center gap-2 bg-gradient-to-r hover:from-sky-500 from-sky-300 hover:via-sky-300  via-sky-500 hover:to-sky-500 to-sky-300 text-white rounded-full">
                                <div className="flex justify-start text-xs md:text-base items-start gap-2" ><Icon className="text-xl" icon="fluent:document-pdf-32-regular"></Icon>Resources.pdf </div>
                                <Icon icon="material-symbols:lock"></Icon>
                            </div>}
                       
                        <div className={`${role === "Teacher" || role === 'Admin' ? "hidden" : ""}`}><button disabled={btnValue} onClick={() => handleBook(_id)} className={`${booked && 'btn-disabled'} ${isPending &&  "btn-disabled"} btn btn-block btn-outline hover:bg-first hover:text-white rounded-sm`}>{bookLoading ? <Icon className="text-3xl animate-spin mx-auto" icon="solar:black-hole-3-line-duotone" /> : "Book Now"}</button></div>

                    </div>
                </div>


            </div>
            <div>
                <h1 className=" text-center md:py-8 py-4 md:text-5xl text-3xl font-bold text-first"> Review of this session</h1>
            </div>
            <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 px-3">


                {reviews?.map((singleReview, idx) => <Reviewcard key={idx} singleReview={singleReview} ></Reviewcard>)}

            </div>
        </section>
    );
};

export default StudySectionDetails;