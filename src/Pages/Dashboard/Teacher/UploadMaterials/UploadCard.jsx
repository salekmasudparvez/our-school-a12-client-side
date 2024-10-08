import { Icon } from "@iconify/react/dist/iconify.js";
import CustomFileUpload from "./CustomFileUpload";
import useAuth from "../../../../Hook/useAuth";
import toast from "react-hot-toast";
import { useState } from "react";
import { Hourglass } from "react-loader-spinner";
import axios from "axios";
import { PropTypes } from 'prop-types';
import { useNavigate } from "react-router-dom";


const UploadCard = ({session}) => {
    const{SessionTitle, SessionDescription,_id}=session || {}
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate()

    const handleUpload = async(event) => {
        event.preventDefault();
        setLoading(true)
        const image = event.target.image.files[0];
        const materialsUrl = event.target.url.value;
        const tutorEmail = user.email;
        const title = SessionTitle
        if(!image){
            toast.error('Please select an image')
            setLoading(false)
            return
        }
        if(!materialsUrl){
            toast.error('Please enter a url')
            setLoading(false)
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
            //console.log(data.data.display_url)
             
            //2. upload to mongodb
            const newMaterial = {
                title,
                tutorEmail,
                sessionId:_id,
                materialsUrl,
                imageUrl:data.data.display_url,
            }
            //console.log(newMaterial)
            
            await axios.post('https://server-study.vercel.app/materials', newMaterial)
            toast.success('Signup Successful')
            setLoading(false)
            navigate("/dashboard/tutor/allMaterials")

        } catch (err) {
            console.log(err)
            setLoading(false)
            toast.error(err.message)
        }
    }
    if(!user||loading){
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
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col pt-10 items-center pb-10">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{SessionTitle}</h5>
            <p className="text-sm text-center text-gray-400">{SessionDescription}</p>
            <div className="flex mt-4 md:mt-6">
                <form onSubmit={handleUpload} className="flex flex-col gap-2">
                    <div className="flex justify-center border p-2 items-center whitespace-nowrap">
                        <Icon className="text-xl" icon="jam:link" />

                        <input type="url" name="url" className="form-control focus:outline-none  px-2 py-1" placeholder="Drive link of Materials" />
                        {/* Todo: add dynamic drive link */}

                        {/* <Icon onClick={handleAddLink} className=" btn btn-circle btn-sm" icon="gala:add" /> */}
                    </div>
                    <CustomFileUpload />
                    <button type="submit" className="btn whitespace-nowrap rounded bg-first text-white hover:text-black"><span className="text-xl"><Icon icon="material-symbols:upload" /></span> Upload</button>

                </form>
            </div>
            <div>

            </div>
        </div>
    </div>
);
}
UploadCard.propTypes = {
    session: PropTypes.object.isRequired,
}


export default UploadCard;