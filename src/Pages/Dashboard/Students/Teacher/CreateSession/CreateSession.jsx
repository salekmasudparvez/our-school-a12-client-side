import { Hourglass } from "react-loader-spinner";
import PrimaryInput from "../../../../../Components/Dashboard/PrimaryInput";
import HeaderTitle from "../../../../../Components/HeaderTitle";
import useAuth from './../../../../../Hook/useAuth';
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Icon } from "@iconify/react/dist/iconify.js";


const CreateSession = () => {
    const {user} =useAuth();
    const[loadingSession,setLoadingSession]= useState(false)

    const handleCreateSessiom = async(e) => {
        e.preventDefault();
        setLoadingSession(true)
        const sessionTitle = e.target.sessionTitle.value;
        const tutorName = e.target.tutorName.value;
        const sessionDescription = e.target.sessionDescription.value;
        const registrationStartDate = e.target.registrationStartDate.value;
        const registrationEndtDate = e.target.registrationEndtDate.value;
        const classStartDate = e.target.classStartDate.value;
        const classEndtDate = e.target.classEndDate.value;
        const sessionDuration = e.target.sessionDuration.value;
        const registrationFee = e.target.registrationFee.value;
        const status = e.target.status.value;
        const tutorEmail = e.target.tutorEmail.value;
        const createSessionData={
            SessionTitle:sessionTitle,
            TutorName:tutorName,
            SessionDescription:sessionDescription,
            RegistrationStartDate:registrationStartDate,
            RegistrationEndDate:registrationEndtDate,
            SessionDuration:sessionDuration,
            ClassStartDate:classStartDate,
            ClassEndDate:classEndtDate,
            RegistrationFee:registrationFee,
            Status:status,
            TutorEmail:tutorEmail,
        }
        

        try {
            await axios.post('http://localhost:5000/pendingSessions', createSessionData)
            .then(res=>{
                if(res){
                    // console.log(res)
                    setLoadingSession(false)
                    toast.success('Session created successfully')
                    // navigate('/dashboard/notes')
                }
            })
        } catch (error) {
            toast.error(error)
            setLoadingSession(false)
        }

    }
    if(!user||loadingSession){
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
        < div className=" block px-3 rounded bg-white md:p-6 shadow-4 " >
            <HeaderTitle heading="Create Session" title="Session will be pending for admin approval" />
            <form onSubmit={handleCreateSessiom}>
                <div className="grid grid-cols-2 gap-4">
                    <PrimaryInput name="sessionTitle" type="text" text="Session Title" />
                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <input
                            name='tutorName'
                            type="text"
                            value={user?.displayName}
                            readOnly
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=" " />

                        <label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                        >Tutor&apos;s Name
                        </label>
                    </div>
                </div>
                <div >
                    <PrimaryInput name="sessionDescription" type="text" text="Session Description" />
                </div>
                <div className="flex w-full md:flex-row flex-col">
                    <div className="my-auto">
                        <h1 className="text-second whitespace-nowrap">Registration Date from</h1>
                    </div>
                    <div className="flex my-auto px-3 items-center justify-between w-full">

                        <input name="registrationStartDate" className="px-2 w-full focus:outline-none border  border-b-second rounded" type="date" />


                        <div className="divider divider-horizontal">To</div>

                        <input name="registrationEndtDate" className="px-2 w-full  focus:outline-none border border-b-second rounded" type="date" />

                    </div>
                </div>
                <div className="flex w-full md:flex-row flex-col">
                    <div className="my-auto">
                        <h1 className="text-second whitespace-nowrap">Class Date from</h1>
                    </div>
                    <div className="flex my-auto px-3 items-center justify-between w-full">

                        <input name="classStartDate" className="px-2 w-full focus:outline-none border  border-b-second rounded" type="date" />


                        <div className="divider divider-horizontal">To</div>

                        <input name="classEndDate" className="px-2 w-full  focus:outline-none border border-b-second rounded" type="date" />

                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <input
                            name='sessionDuration'
                            type="number"
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=" " />

                        <label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                        >Session Duration (hr)
                        </label>
                    </div>
                    <div className="relative mb-6" data-twe-input-wrapper-init>
                        <input
                            name='registrationFee'
                            type="number"
                            readOnly
                            value="0"
                            className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=" " />

                        <label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                        > Registration fee
                        </label>
                    </div>
      
                </div>
                <div className="grid grid-cols-2 w-full gap-4">
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                                name="status"
                                type="text"
                                value="pending"
                                readOnly
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder=" " />

                            <label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                            >Status
                            </label>
                        </div>
                        <div className="relative mb-6" data-twe-input-wrapper-init>
                            <input
                                name="tutorEmail"
                                type="text"
                                value={user?.email}
                                readOnly
                                className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                placeholder=" " />

                            <label
                                className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
                            >Tutor Email
                            </label>
                        </div>
                    </div>

                <button
                    type="submit"
                    className="btn btn-block bg-first text-white hover:text-black">
                    {loadingSession?<Icon className="text-3xl animate-spin mx-auto" icon="solar:black-hole-3-line-duotone" />:"Create Session"}
                </button>
            </form>
        </div >
    );
};

export default CreateSession;