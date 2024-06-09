

import { Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import { PropTypes } from 'prop-types';



const NoneUser = ({ children }) => {
    const {user } = useAuth();
   
    
  

    if (!user) {
        return <>
            {children}
        </>
    }
    return <Navigate to='/' replace={true}></Navigate>

};
NoneUser.propTypes={
    children:PropTypes.node.isRequired,
}
export default NoneUser;

