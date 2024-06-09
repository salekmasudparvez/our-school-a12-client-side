

import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";
import useRole from "../Hook/useRole";
import { PropTypes } from 'prop-types';



const AdminRoutes = ({ children }) => {
    const {loading } = useAuth();
    const [role]=useRole();
    if (loading || !role) {
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
  

    if (role==='Admin') {
        return <>
            {children}
        </>
    }
    return <Navigate to='/' replace={true}></Navigate>

};
AdminRoutes.propTypes={
    children:PropTypes.node.isRequired,
}
export default AdminRoutes;