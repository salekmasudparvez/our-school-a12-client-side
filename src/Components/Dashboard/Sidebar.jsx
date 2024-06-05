
import { Icon } from "@iconify/react/dist/iconify.js";
import useRole from "../../Hook/useRole";
import SidebarItems from "./SidebarItems";
import useAuth from "../../Hook/useAuth";



const Sidebar = () => {
    const [role] = useRole();
    const {LogOutUser}=useAuth()

    return (
        <div className="flex flex-col text-second justify-between items-center h-full">
            <div className="flex flex-col w-full gap-4">
                {role === 'Student' &&
                    <> 
                        <SidebarItems name="Booked session" path="/dashboard" icon="icon-park:buy" />
                        <SidebarItems name="Create notes" path="/dashboard/createnote" icon="marketeq:create-note" />
                        <SidebarItems name="Notes" path="/dashboard/notes" icon="icon-park:notes" />
                        <SidebarItems name="Study materials" path="/dashboard/studymaterials" icon="unjs:unpdf" />
                    </>
                }
                {role === 'Teacher' &&
                    <> 
                        <SidebarItems name=" Create session" path="/dashboard/tutor" icon="oui:ml-create-single-metric-job" />
                        <SidebarItems name="View all-sessions" path="/dashboard/tutor/ViewAllSessions" icon="ep:view" />
                        <SidebarItems name="Upload materials" path='/dashboard/tutor/UploadMaterials' icon="material-symbols:upload" />
                        <SidebarItems name="All materials" path="/dashboard/studymaterials" icon="bx:file" />
                        <SidebarItems name="All notes" path="/dashboard/studymaterials" icon="hugeicons:note" />
                    </>
                }

                <a onClick={LogOutUser} className="flex md:hidden items-center justify-center gap-2"><Icon icon="material-symbols:logout" /> Logout</a>
            </div>
            <div>
                <a onClick={LogOutUser} className="hidden md:flex items-center justify-center gap-2"><Icon icon="material-symbols:logout" /> Logout</a>
            </div>
        </div>
    );
};

export default Sidebar;