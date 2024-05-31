import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

const NavItem = ({name,path}) => {
    return (
        <a ><NavLink className={({ isActive }) => isActive ? 'md:text-first border-b md:border-b-first md:inline block bg-first md:bg-transparent p-2' : 'p-2 md:inline block'} to={path}>{name}</NavLink></a>
    );
};
NavItem.propTypes={
    name:PropTypes.string.isRequired,
    path:PropTypes.string.isRequired
}
export default NavItem;