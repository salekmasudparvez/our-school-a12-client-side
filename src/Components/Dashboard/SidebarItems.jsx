import { NavLink } from "react-router-dom";
import { PropTypes } from 'prop-types';
import { Icon } from "@iconify/react/dist/iconify.js";


const SidebarItems = ({name,path,icon}) => {
    return (
            <a><NavLink end className={({isActive})=>isActive?"bg-first px-3 py-2 rounded whitespace-nowrap text-white flex text-left gap-2 items-center":"px-3 hover:bg-gray-100 whitespace-nowrap py-2 flex rounded text-second text-left md:w-full gap-2 items-center"} to={path} ><span className="text-xl"><Icon icon={icon}></Icon></span>{name}</NavLink></a>
    );
};
SidebarItems.propTypes={
    name:PropTypes.string.isRequired,
    path:PropTypes.string.isRequired,
    icon:PropTypes.string.isRequired,
}
export default SidebarItems;