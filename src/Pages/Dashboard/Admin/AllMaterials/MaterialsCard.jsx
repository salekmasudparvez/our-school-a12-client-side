import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { LineWave } from "react-loader-spinner";
import { PropTypes } from 'prop-types';
import { isBefore } from "date-fns";
import toast from "react-hot-toast";


const MaterialsCard = ({ material,refetch }) => {
    const [open, sesOpen] = useState(false)
    const [openModal, setOpenamodal] = useState(false);
    const [isLoading, setloading] = useState(false);
    const { title, imageUrl, materialsUrl, sessionId,_id } = material || {};

    const { isLoading:Loader, data: sessions } = useQuery({
        queryKey: ['allMaterialsDate', sessionId],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/classEndDate/${sessionId}`)
            return res.data
        }
    })

    const handleDelete = async (_id) => {
       
        setloading(true);
        try {
            await axios.delete(`http://localhost:5000/deleteMaterials/${_id}`)
                .then(res => {
                    //console.log(res)
                    if(res.data.deletedCount>1){
                        toast.success("Deleted Successfully")
                    }
                    if(res.data.deletedCount===0){
                        toast.error("Deleted Unavailable")
                    }
                    refetch()
                    setloading(false)
                })
        } catch (error) {
            toast.error(error);
            setloading(false) 
        }
    }

    if (!sessionId || isLoading ||Loader) {
        return (<div className="flex justify-center items-center w-full h-full ">
            <LineWave
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="line-wave-loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
            />
        </div>)
    }


    return (
        <>
            <div className={`w-72 z-0 space-y-2 p-8 ${isBefore(sessions.ClassEndDate, new Date) && 'bg-error bg-opacity-20'}  shadow-md border relative`}>
                {isBefore(sessions.ClassEndDate, new Date) && <div className=" absolute top-9 bg-opacity-60 right-1 badge badge-error">Outdated</div>}
                <div className=" absolute top-1 right-1 text-gray-500 text-xl">
                    <Icon onClick={() => sesOpen(!open)} className="text-xl" icon="mdi-light:dots-vertical" />
                    {
                        open &&
                        <div className="absolute top-5 right-1 bg-gray-200 w-32 rounded shadow-inner border  py-3">
                            <button onClick={() => setOpenamodal(true)} className="flex mx-auto btn btn-sm rounded-none whitespace-nowrap"><span><Icon className="text-xl" icon="material-symbols:delete-outline"></Icon></span><span>Delete</span></button>
                        </div>
                    }
                </div>
                <div>
                    <h1 className="whitespace-nowrap">{title}</h1>
                    <p>{sessions.ClassEndDate}</p>
                </div>
                <img className="h-40 w-full  object-cover" src={imageUrl} />
                <a href={materialsUrl} className="btn rounded btn-outline  border border-gray-500 btn-block flex justify-center items-center ">
                    <span><Icon text-xl icon="mingcute:download-line"></Icon></span>
                    <span>Download Resources</span>
                </a>

            </div>
            <div className={`absolute z-50 top-0 w-full px-3 min-h-screen  ${openModal ? 'flex' : 'hidden'} backdrop-blur-md justify-center items-center`}>
                <div className="flex flex-col lg:max-w-xl items-center md:max-w-lg max-w-md w-full gap-2 p-6 rounded-md shadow-md bg-gray-200 text-second">
                    <h2 className="text-xl font-semibold leading-tight text-center tracking-wide">Are you sure?</h2>
                    <p className='text-center'>You won&apos;t be able to revert this!</p>
                    <div className="flex justify-center  gap-3 mt-6 flex-row-reverse">
                        <button onClick={() => setOpenamodal(false)} className="btn hover:text-black rounded-sm shadow-sm bg-red-400 text-gray-100">Cancel</button>
                        <button onClick={() => handleDelete(_id)} className="btn hover:text-black rounded-sm shadow-sm bg-first text-white">Yes,delete it !</button>
                    </div>
                </div>
            </div>
        </>
    );
};
MaterialsCard.propTypes = {
    material: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
}
export default MaterialsCard;