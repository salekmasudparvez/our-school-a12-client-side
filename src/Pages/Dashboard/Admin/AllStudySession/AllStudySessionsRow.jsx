
import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { useRef, useState } from 'react';

const AllStudySessionsRow = ({ session, idx, refetch, setloading,setStatus }) => {

    const { SessionTitle, SessionDescription, Status, _id } = session || {};
    setStatus(Status)
    const [open, setOpen] = useState(false)
    const fee = useRef(null)
    // const [status, setStatus] = useState('')
    const handleSessionStatus = async (_id, status, sessionFee) => {
        console.log(_id, status, sessionFee)

        setloading(true);
        let updateDoc = { id: _id, status: status }
        if (status === "approved") {
            updateDoc = { id: _id, status: status, sessionObject: session, fee: sessionFee }
        }
        await axios.patch('http://localhost:5000/allsessionsstatus', updateDoc)
            .then(res => {
                console.log(res)
                refetch()
                setloading(false)
            })
    }

    return (
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{SessionTitle}</td>
                <td>{SessionDescription}</td>
                <td>
                    {Status === "pending" && <div className='flex text-xl rounded-full gap-1 items-center justify-center'>
                        <button onClick={() => setOpen(true)} className='text-green-500 rounded-full border btn btn-xs bg-white '><Icon icon="icon-park-solid:correct" /></button>
                        <button onClick={() => handleSessionStatus(_id, "rejected")} className='text-red-500 rounded-full border btn btn-xs bg-white'><Icon icon="charm:cross" /></button>
                    </div>
                    }
                    {Status === "approved" &&
                        <div className='flex justify-center items-start flex-row '>
                            <button className='btn btn-xs rounded-none'><Icon icon="tabler:edit"></Icon>Update</button>
                            <button className='btn btn-xs rounded-none'><Icon icon="material-symbols:delete-outline"></Icon> Edit</button>
                        </div>
                    }

                    {Status === "rejected" &&
                        <button className='flex bg-error items-center whitespace-nowrap text-center mx-auto rounded-full px-2 py-1 text-white font-medium border border-red-500'>
                            <span><Icon className='text-white text-xl' icon="charm:cross" /></span>Rejected
                        </button>}

                </td>

            </tr>
            <div className={`absolute top-0 w-full px-3 min-h-screen  ${open ? 'flex' : 'hidden'} backdrop-blur-md justify-center items-center`}>
                <div className="flex flex-col lg:max-w-xl items-center md:max-w-lg max-w-md w-full gap-2 p-6 rounded-md shadow-md bg-gray-200 text-second">
                    <h2 className="text-xl font-semibold leading-tight text-center tracking-wide">Session Fee</h2>
                    <input ref={fee} name="fee" type="number" defaultValue="0" placeholder="Type here" className="input w-full max-w-xs" />
                    <div className="flex justify-center  gap-3 mt-6 flex-row-reverse">
                        <button onClick={() => setOpen(false)} className="btn hover:text-black rounded-sm shadow-sm bg-red-400 text-gray-100">Cancel</button>
                        <button onClick={() => handleSessionStatus(_id, "approved", fee.current.value)} className="btn hover:text-black rounded-sm shadow-sm bg-first text-white">Confirm Approval</button>
                    </div>
                </div>
            </div>
        </>
    );
};
AllStudySessionsRow.propTypes = {
    session: PropTypes.obj,
    idx: PropTypes.number,
    refetch: PropTypes.func,
    setloading: PropTypes.func,
    setStatus: PropTypes.func,
}
export default AllStudySessionsRow;