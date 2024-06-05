import HeaderTitle from "../../../../../Components/HeaderTitle";
import UploadCard from "./UploadCard";


const UploadMaterials = () => {

    return (
        <div>
            <HeaderTitle heading="Upload Materials" title="Upload your approved session's materials for student" />
            <div className="px-3 md:px-8">

               <div className="grid grid-cols-1  md:grid-cols-2 place-items-center px-3">
                <UploadCard/>
                <UploadCard/>
                <UploadCard/>
               </div>

            </div>
        </div>
    );
};

export default UploadMaterials;