

import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";
import { PropTypes } from 'prop-types';
import useRole from "../Hook/useRole";



const StudentRoutes = ({ children }) => {
    const {loading,user } = useAuth();
    const[role]=useRole()
   
    if (loading || !user|| !role) {
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
  

    if (role==='Student'&& user) {
        return <>
            {children}
        </>
    }
    return <Navigate to='/' replace={true}></Navigate>

};
StudentRoutes.propTypes={
    children:PropTypes.node.isRequired,
}
export default StudentRoutes;
