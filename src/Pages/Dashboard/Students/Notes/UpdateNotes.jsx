import { useLoaderData, useNavigate } from "react-router-dom";
import HeaderTitle from "../../../../Components/HeaderTitle";
import useAuth from "../../../../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";


const UpdateNotes = () => {
    const {user}=useAuth()
    const data = useLoaderData();
    const navigate = useNavigate();
    const [loader,setLoader]=useState(false)
    const {
        title,
        description,
        _id,
    } = data
    const handleUpdateNotes=async(event)=>{
         event.preventDefault();
         setLoader(true)
        const title = event.target.title.value;
        const description = event.target.description.value;
        const updateNote = {

            title: title,
            description: description,
        }
        try {
           await axios.patch(`http://localhost:5000/noteUpdate/${_id}`,updateNote)
           .then(res=>{
            if(res){
                toast.success('Note updated successfully')
                setLoader(false)
                navigate('/dashboard/notes')
            }
           })
        } catch (error) {
            setLoader(false)
            toast.error('Error updating')
        }
        
    }
    if(!user || loader){
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
        <div className="flex flex-col justify-center items-center md:py-2  w-full px-4">
                <HeaderTitle heading="Update your notes" title="You can save , update and delete your note easily" ></HeaderTitle>
                <form onSubmit={handleUpdateNotes} className="flex flex-col w-full gap-4  items-center ">
                    <label className="input md:w-1/2 w-full input-bordered flex items-center gap-2">
                        Email
                        <input name="email" type="text" className="grow " value={user?.email} readOnly />
                    </label>
                    <label className="input  md:w-1/2 w-full input-bordered flex items-center gap-2">
                        Title
                        <input name="title" type="text" className="grow" placeholder="Title" defaultValue={title} />
                    </label>

                    <textarea name="description" placeholder="Description" defaultValue={description} className="textarea  md:w-1/2 w-full textarea-bordered textarea-lg" ></textarea>
                    <button className="btn w-full md:w-1/2 bg-first text-white hover:text-gray-500 btn-lg ">Save</button>
                </form>
            </div>
    );
};

export default UpdateNotes;