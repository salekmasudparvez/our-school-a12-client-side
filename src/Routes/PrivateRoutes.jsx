

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";
import { PropTypes } from 'prop-types';



const PrivateRoutes = ({ children }) => {
    const {loading,user } = useAuth();
    const location = useLocation();
    if (loading ) {
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
    if (user) {
        return <>
            {children}
        </>
    }
        return <Navigate to='/singup' state={location} replace={true}></Navigate>
    
    
    

};
PrivateRoutes.propTypes={
    children:PropTypes.node.isRequired,
}
export default PrivateRoutes;