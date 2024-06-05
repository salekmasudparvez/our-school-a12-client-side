import { useState } from "react";
import HeaderTitle from "../../../../Components/HeaderTitle";
import useAuth from "../../../../Hook/useAuth";
import { Hourglass } from 'react-loader-spinner'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const CreateNotes = () => {
    const { user } = useAuth();
    const [loadingNotes, setLoadingNotes] =useState(false);
    const navigate =useNavigate()
    
    if (!user) {
        return <div className="flex justify-center items-center w-full text-red-500 h-screen"><span className="loading loading-spinner loading-lg"></span></div>
    }
    const handleNotes = async(event)=>{
        event.preventDefault();
        setLoadingNotes(true)

        const email=event.target.email.value;
        const title = event.target.title.value;
        const description = event.target.description.value;
        const newNote = {
            email: email,
            title: title,
            description: description,
        }
        // console.log(newNote)
        try {
            await axios.post('http://localhost:5000/notes', newNote)
            .then(res=>{
                if(res){
                    // console.log(res)
                    setLoadingNotes(false)
                    navigate('/dashboard/notes')
                }
            })
        } catch (error) {
            toast.error(error)
            setLoadingNotes(false)
        }
    }
    if(loadingNotes){
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
        <>
            <div className="flex flex-col justify-center items-center md:py-2  w-full px-4">
                <HeaderTitle heading="Create your notes" title="You can save , update and delete your note easily" ></HeaderTitle>
                <form onSubmit={handleNotes} className="flex flex-col w-full gap-4  items-center ">
                    <label className="input md:w-1/2 w-full input-bordered flex items-center gap-2">
                        Email
                        <input name="email" type="text" className="grow " value={user?.email} readOnly />
                    </label>
                    <label className="input  md:w-1/2 w-full input-bordered flex items-center gap-2">
                        Title
                        <input name="title" type="text" className="grow" placeholder="Title" />
                    </label>

                    <textarea name="description" placeholder="Description" className="textarea  md:w-1/2 w-full textarea-bordered textarea-lg" ></textarea>
                    <button className="btn w-full md:w-1/2 bg-first text-white hover:text-gray-500 btn-lg ">Save</button>
                </form>
            </div>
        </>
    )
};



export default CreateNotes;