import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { PropTypes } from 'prop-types';
import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const NoteCard = ({ note ,refetch}) => {
    const {
        title,
        description,
        _id,
    } = note
const [open,setopen]=useState(false)

const handleDelete =async()=>{
    try {
       await axios.delete(`https://server-study.vercel.app/notes/${_id}`)
        .then(res=>{
            if(res){
                
                setopen(false)
                toast.success("Note Deleted")
                refetch()

            }
        })
    } catch (error) {
        setopen(false)
        toast.error(error.message)
    }
}

return (
        <>
            <div className="w-full space-y-2 max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800">
                <div>
                    <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">{title}</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
                </div>
                <div className="flex justify-between">
                    <Link to={`/dashboard/notes/${_id}`} className="flex items-center gap-1 justify-center btn btn-sm btn-success text-white"><Icon icon="tabler:edit" ></Icon>Edit</Link>
                    <button onClick={() => setopen(true)} className="flex items-center gap-1 justify-center btn btn-sm btn-error text-white"><Icon icon="material-symbols:delete-outline" ></Icon>Delete</button>
                </div>
            </div>
            {/* custom modal */}
            <div className={`absolute top-0 w-full px-3 min-h-screen ${open ?'flex':'hidden'} backdrop-blur-md justify-center items-center`}>
                <div className="flex flex-col lg:max-w-xl md:max-w-lg max-w-md w-full gap-2 p-6 rounded-md shadow-md bg-gray-200 text-second">
                    <h2 className="text-3xl font-semibold leading-tight text-center tracking-wide">Are you sure?</h2>
                    <p className="flex-1 text-center text-gray-500">You won&apos;t be able to revert this!</p>
                    <div className="flex justify-center  gap-3 mt-6 flex-row-reverse">
                        <button onClick={()=>setopen(false)} className="btn hover:text-black rounded-sm shadow-sm bg-red-400 text-gray-100">Cancel</button>
                        <button onClick={handleDelete} className="btn hover:text-black rounded-sm shadow-sm bg-first text-white">Yes, delete it!</button>
                    </div>
                </div>
            </div>
        </>

    );
};
NoteCard.propTypes = {
    refetch: PropTypes.func.isRequired,
    note: PropTypes.object.isRequired,
}
export default NoteCard;