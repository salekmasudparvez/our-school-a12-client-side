
import { Icon } from '@iconify/react/dist/iconify.js';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const AllStudySessionsRow = ({ session, idx,  setStatus,setOpen,setOpenFeedBack,setOpenDelete }) => {

    const { SessionTitle, SessionDescription, Status, _id } = session || {};
    setStatus(Status)
    

   

    
    return (
        <>
            <tr>
                <th>{idx + 1}</th>
                <td>{SessionTitle}</td>
                <td>{SessionDescription}</td>
                <td>
                    {Status === "pending" && <div className='flex text-xl rounded-full gap-1 items-center justify-center'>
                        <button onClick={() => setOpen({modal:true,id:_id,session:session})} className='text-green-500 rounded-full border btn btn-xs bg-white '><Icon icon="icon-park-solid:correct" /></button>
                        <button onClick={() => setOpenFeedBack({modal:true,id:_id})} className='text-red-500 rounded-full border btn btn-xs bg-white'><Icon icon="charm:cross" /></button>
                    </div>
                    }
                    {Status === "approved" &&
                        <div className=' justify-center join items-start flex-row '>
                            <Link to={`/dashboard/admin/allstudysessionupdate/${_id}`} className='btn join-item btn-xs'><Icon icon="tabler:edit"></Icon>Update</Link>
                            <button onClick={() => setOpenDelete({modal:true,id:_id})} className='btn btn-xs join-item'><Icon icon="material-symbols:delete-outline"></Icon> Delete</button>
                        </div>
                    }

                    {Status === "rejected" &&
                        <button className='flex bg-error items-center whitespace-nowrap text-center mx-auto rounded-full px-2 py-1 text-white font-medium border border-red-500'>
                            <span><Icon className='text-white text-xl' icon="charm:cross" /></span>Rejected
                        </button>}

                </td>

            </tr>
            
          
            
        </>
    );
};
AllStudySessionsRow.propTypes = {
    session: PropTypes.obj,
    idx: PropTypes.number,
    refetch: PropTypes.func,
    setloading: PropTypes.func,
    setStatus: PropTypes.func,
    setOpen: PropTypes.bool,
    setOpenFeedBack: PropTypes.bool,
    setOpenDelete: PropTypes.bool,
}
export default AllStudySessionsRow;



