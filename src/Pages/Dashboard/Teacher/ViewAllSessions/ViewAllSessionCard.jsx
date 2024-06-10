import { Icon } from '@iconify/react/dist/iconify.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ViewAllSessionCard = ({ session,refetch }) => {
    const {

        SessionDescription,
        SessionTitle,
        Status,
        _id
    } = session;
    const [open, setOpen] = useState(false)
    //console.log(session)
    const { data:feedBack } = useQuery({
        queryKey: ['feedBack',Status],
        queryFn: async () => {
            const res = await axios(`http://localhost:5000/feedback/${_id}`)
            const data = await res.data
            return data
        }

    })
    const handleUpdateStatus = async(_id)=>{
        try {
            await axios.patch('http://localhost:5000/aceptsession',{id:_id})
                .then(res=>{
                    if(res){
                        toast.success("Session Status Updated")
                        refetch()
                    }})
        } catch (error) {
            toast.error(error)
        }
        
    }
    
    return (
        <>
            <div className="mb-10 overflow-hidden relative rounded-lg bg-white shadow-md duration-300 hover:shadow-xl dark:bg-dark-2 ">
                {/* <img src={Image} alt="" className="w-full " /> */}
                {Status === "pending" ? (
                    <div className="badge bg-[#F5E460] absolute top-1 right-1 text-white gap-2">
                        <Icon icon="eos-icons:bubble-loading" />
                        Pending
                    </div>
                ) : Status === "approved" ? (
                    <div className="badge badge-success absolute top-1 right-1 text-white gap-2">
                        <Icon className='text-green-200' icon="icon-park-solid:success" />
                        Approved
                    </div>
                ) : Status === "rejected" ? (
                    <div className="badge absolute top-1 right-1 text-white badge-error gap-2">
                        <Icon className='text-red-200' icon="oui:cross-in-circle-filled" />
                        Rejected
                    </div>
                ) : null}
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                        <a className="mb-4 block text-xl font-semibold text-dark hover:text-first dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] uppercase" >
                            {SessionTitle}
                        </a>
                    </h3>
                    <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                        {SessionDescription}
                    </p>
                    {Status === "pending" ? (
                        <button className='btn-disabled disabled:bg-info btn rounded-full border  text-base font-medium text-body-color transition hover:border-second hover:bg-first hover:text-white dark:border-dark-3 dark:text-dark-6'>
                            Waiting for Admin approval
                        </button>
                    ) : Status === "approved" ? (
                        <button className='flex whitespace-nowrap text-center mx-auto rounded-full px-2 py-1  text-base font-medium border border-green-500'>
                            <span><Icon className='text-green-600  text-3xl' icon="icon-park-solid:success" /></span>Approved
                        </button>
                    ) : Status === "rejected" ? (<div className=' flex items-center justify-center gap-2'>
                        <button onClick={()=>handleUpdateStatus(_id)} className='btn btn-sm whitespace-nowrap rounded-full btn-error border  text-white font-medium text-body-color transition hover:border-second  hover:text-white dark:border-dark-3 dark:text-dark-6'>
                        <Icon className='text-xl' icon="pajamas:retry"/>Re-check
                    </button>
                        <button onClick={()=>setOpen(true)} className='btn btn-sm rounded-full btn-info border whitespace-nowrap  text-white font-medium text-body-color transition hover:border-second  hover:text-white dark:border-dark-3 dark:text-dark-6'>
                        <Icon className='text-xl' icon="material-symbols:feedback"/> View feedback
                    </button>
                    </div>
                    ) : null}

                </div>
            </div>
            <div className={`absolute top-0 w-full px-3 min-h-[calc(100vh-200px)] h-full  ${open ? 'flex' : 'hidden'} backdrop-blur-md justify-center items-center`}>
                <div className="flex relative flex-col lg:max-w-xl items-center md:max-w-lg max-w-md w-full gap-2 p-6 rounded-md shadow-md bg-gray-200 text-second">
                    <h2 className="text-xl font-semibold leading-tight text-center tracking-wide">Feedback</h2>
                    <p className='text-center'>Reject reason:{feedBack?.rejectReason}</p>
                    <p className='text-center'>Feedback :{feedBack?.feedBack}</p>
                    <button onClick={()=>setOpen(false)} className='absolute top-2 right-1'><Icon className='text-xl' icon="ic:round-close"/></button>
                </div>
            </div>
        </>
    )
};
ViewAllSessionCard.propTypes = {
    session: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
}
export default ViewAllSessionCard;