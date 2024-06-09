import { Icon } from "@iconify/react/dist/iconify.js";

const StudyMaterialCard = ({material}) => {
    const { title, imageUrl, materialsUrl } = material || {};
    return (
        <div className={`w-72 z-0 space-y-2 p-8   shadow-md border relative`}>
            <div>
                <h1 className="whitespace-nowrap">{title}</h1>
            </div>
            <img className="h-40 w-full  object-cover" src={imageUrl} />
            <a href={materialsUrl} className="btn rounded btn-outline  border border-gray-500 btn-block flex justify-center items-center ">
                <span><Icon text-xl icon="mingcute:download-line"></Icon></span>
                <span>Download Resources</span>
            </a>

        </div>
    );
};

export default StudyMaterialCard;