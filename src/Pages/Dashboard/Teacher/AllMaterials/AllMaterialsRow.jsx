import { useState } from 'react';
import { Icon } from '@iconify/react';
import { PropTypes } from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from "../../../../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";
import CustomFileUpload from '../UploadMaterials/CustomFileUpload';

const AllMaterialsRow = ({ material, refetch }) => {
    const {
        title,
        sessionId,
        materialsUrl,
        imageUrl, } = material || {};
    const [openMenu, setOpenMenu] = useState(false);
    const [openUpdate, setopenUpdate] = useState(false)
    const [open, setOpen] = useState(false);
    const { user } = useAuth()
    const [loader, setLoader] = useState(false)

    //delete part start
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/materials/${sessionId}`)
                .then(res => {
                    if (res) {
                        setOpen(false)
                        toast.success("Material Deleted")
                        refetch()

                    }
                })
        } catch (error) {
            setOpen(false)
            toast.error(error.message)
        }
    }
    //delete part end
    //update part start

    const handleUpdateNotes = async (event) => {
        event.preventDefault();
        setLoader(true)
        const materialsUrl = event.target.url.value;
        const image = event.target.image.files[0];
        
        if(!image){
            toast.error('Please select an image')
            setLoader(false)
            return
        }
        if(!materialsUrl){
            toast.error('Please enter a url')
            setLoader(false)
            return
        }
        const formData = new FormData()
        formData.append('image', image)
        
        try {
             // 1. Upload image and get image url
             const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
                }`,

                formData
            )
            //2.update mongodb api
            const updateMaterial = {
                materialsUrl,
                imageUrl:data.data.display_url,
                sessionId
           }
           console.log(updateMaterial)

            await axios.patch('http://localhost:5000/material', updateMaterial)
                .then(res => {
                    if (res) {
                        toast.success('Note updated successfully')
                        setLoader(false)
                        setOpenMenu(false)
                        setopenUpdate(false)
                        refetch()
                    }
                })
        } catch (error) {
            setLoader(false)
            setOpenMenu(false)
            setopenUpdate(false)
            toast.error('Error updating')
        }

    }
    if (!user || loader) {
        return (<div className="flex mx-auto justify-center items-center w-full min-h-screen">
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

    //update part end

    return (
        <>
            <tr>
                <th onClick={() => { setOpenMenu(false) }} >
                    <div className="avatar">
                        <div className="w-24 rounded">
                            <img src={imageUrl || "https://i.ibb.co/Qr9pWXJ/unknown.webp"} />
                        </div>
                    </div>
                </th>
                <td onClick={() => { setOpenMenu(false) }} >{title}</td>
                <td onClick={() => { setOpenMenu(false) }} >{materialsUrl.substring(0, 40) + "..."}</td>
                <td className='relative'>
                    <Icon onClick={() => setOpenMenu(!openMenu)} className='text-xl hover text-second' icon="charm:menu-kebab" />
                    <div className={`${openMenu ? "flex" : "hidden"}  absolute -top-3 right-full chat chat-end`}>

                        <div className="chat-bubble bg-gray-100 border rounded text-second">
                            <div>
                                <button onClick={()=>setopenUpdate(true)} className='px-2 hover:bg-slate-200 whitespace-nowrap flex items-center gap-1 py-1'>
                                    <Icon icon="tabler:edit" />
                                    <span>Update</span>
                                </button>
                            </div>
                            <div>
                                <button onClick={() => setOpen(true)} className='px-2 hover:bg-slate-200 whitespace-nowrap flex items-center gap-1 py-1'>
                                    <Icon icon="material-symbols:delete" />
                                    <span>Delete</span>
                                </button>
                            </div>

                        </div>

                    </div>
                </td>

            </tr>
            <div className={`absolute top-0 bottom-0 w-full z-50 px-3 h-full ${open ? 'flex' : 'hidden'}  justify-center items-center`}>
                <div className="flex absolute w-full backdrop-blur-sm  flex-col  gap-2 p-6 rounded-md shadow-md text-second">
                    <h2 className="text-3xl font-semibold leading-tight text-center tracking-wide">Are you sure?</h2>
                    <p className="flex-1 text-center text-gray-500">You won&apos;t be able to revert this!</p>
                    <div className="flex justify-center  gap-3 mt-6 flex-row-reverse">
                        <button onClick={() => setOpen(false)} className="btn hover:text-black rounded-sm shadow-sm bg-red-400 text-gray-100">Cancel</button>
                        <button onClick={handleDelete} className="btn hover:text-black rounded-sm shadow-sm bg-first text-white">Yes, delete it!</button>
                    </div>
                </div>
            </div>
            <div className={`absolute top-0 bottom-0 w-full z-50 px-3 h-full ${openUpdate ? 'flex' : 'hidden'} backdrop-blur-sm justify-center items-center`}>
                <form onSubmit={handleUpdateNotes} className="flex absolute w-full justify-center md:flex-row flex-col md:items-center items-start  gap-2 p-6 rounded-md  text-second">
                    <div className="flex justify-center border p-2 items-center whitespace-nowrap">
                        <Icon className="text-xl" icon="jam:link" />

                        <input type="url" name="url" className="form-control focus:outline-none  px-2 py-1" placeholder="Drive link of Materials" />
                        {/* Todo: add dynamic drive link */}

                        {/* <Icon onClick={handleAddLink} className=" btn btn-circle btn-sm" icon="gala:add" /> */}
                    </div>
                    <div className='bg-white'>
                        <CustomFileUpload />
                    </div>
                    <div className="flex justify-center gap-2">
                        <button type='submit' className="btn  hover:text-black rounded-sm shadow-sm bg-first text-white">Save</button>
                        <button onClick={() => setopenUpdate(false)} className="btn hover:text-black rounded-sm shadow-sm bg-red-400 text-gray-100">Cancel</button>
        
                    </div>
                </form>
            </div>
        </>

    );
};
AllMaterialsRow.propTypes = {
    material: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
}
export default AllMaterialsRow;