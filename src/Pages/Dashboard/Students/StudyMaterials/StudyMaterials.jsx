import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../../Hook/useAuth";
import StudyMaterialCard from "./StudyMaterialCard";



const StudyMaterials = () => {
    const {user}=useAuth()
    const {data:AllMaterials}=useQuery({
        queryKey:['studyMaterials'],
        queryFn:async()=>{
            const response=await axios.get(`https://server-study.vercel.app/studyMaterials/${user.email}`)
            const data=response.data
            return data;
        }
    })
    return (
        <div>
            <div className="text-center space-y-4 py-6">
                <h1 className=" text-first text-3xl font-bold uppercase font-sans">Study Materials</h1>
            </div>
            <div className="grid lg:grid-cols-3 place-items-center md:grid-cols-2 grid-cols-1">
                {AllMaterials?.map((material,idx)=><StudyMaterialCard key={idx} material={material} />)}

            </div>
        </div>
    );
};

export default StudyMaterials;