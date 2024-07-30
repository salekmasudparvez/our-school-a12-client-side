import { NavLink, useMatch } from "react-router-dom";
import PropTypes from 'prop-types';

const NavItem = ({name,path}) => {
    const match = useMatch(path);
    return (
        // <a ><NavLink className={({ isActive }) => isActive ? 'md:text-first text-gray-700 border-b md:border-b-first md:inline block bg-first md:bg-transparent p-2 ' : 'p-2 md:inline block text-gray-700  '} to={path}>{name}</NavLink></a>
        <a ><NavLink className={`${match?"md:text-first text-gray-700 md:border-b-first md:inline block bg-first md:bg-transparent ":"text-gray-700"}border-b p-2 md:inline block`} to={path}>{name}</NavLink></a>
    );
};
NavItem.propTypes={
    name:PropTypes.string.isRequired,
    path:PropTypes.string.isRequired
}
export default NavItem;