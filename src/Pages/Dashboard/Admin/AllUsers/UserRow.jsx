
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { useRef } from 'react';
import toast from 'react-hot-toast';

const UserRow = ({user,setloadingUpdate,refetch,idx}) => {
    const {name,email,role,image}=user || {};
    const select = useRef(null)
    const handleUpdateRole =async () => {
        // console.log(select.current.value)
        const updateRole = select.current.value;
        setloadingUpdate(true);
        const updateRoleDoc ={
            email:email,
            updateRole,
        }
        try {
            await axios.patch('http://localhost:5000/allusers',updateRoleDoc)
            .then(res=>{
                if(res){
                    setloadingUpdate(false);
                    toast.success('Role updated successfully');
                    refetch();
                }
            })

        } catch (error) {
            toast.error(error)
            setloadingUpdate(false);
        }
    }
    return (
        <tr>
            <th>
                {idx+1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>

                    </div>
                </div>
            </td>
            <td>
                {email}
            </td>
            <td><span className={`py-1 rounded-full ${role === "Teacher" ? 'bg-purple-200 px-2 ' : role === "Student" ? "bg-sky-200 px-2 " : role === "Admin" ? "bg-orange-200 px-2 " : null}`}>{role}</span> </td>
            <th className="min-w-32 whitespace-nowrap">
                <select ref={select} onChange={handleUpdateRole} value={role} className="border rounded-full  text-second font-normal p-2 border-second w-full max-w-28">
                    {/* <option disabled selected>Update role</option>  */}
                    <option value="Student">Student</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                </select>
            </th>
        </tr>
    );
};
UserRow.propTypes={
    user:PropTypes.obj,
    setloadingUpdate:PropTypes.func,
    refetch:PropTypes.func,
    idx:PropTypes.number,
}
export default UserRow;