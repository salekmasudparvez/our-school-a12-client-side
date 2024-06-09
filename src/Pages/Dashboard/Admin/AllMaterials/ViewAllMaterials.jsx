import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MaterialsCard from "./MaterialsCard";
import useAuth from "../../../../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";


const ViewAllMaterials = () => {
    const {user}=useAuth()
    const {isLoading, refetch,data:AllMaterials}=useQuery({
        queryKey:['allMaterials'],
        queryFn:async()=>{
            const res=await axios.get('http://localhost:5000/allMaterials')
            return res.data
        }
    })
    
    
    if(!user||isLoading){
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
    
    return (
        <div className="w-full">
            <div className="w-full ">
                <h1 className="text-first text-xl text-center py-7 mx-auto">
                    All Materials
                </h1>
            </div>
            <div className="grid lg:grid-cols-3 place-items-center md:grid-cols-2 grid-cols-1">
                {AllMaterials?.map((material,idx)=><MaterialsCard key={idx} refetch={refetch} material={material} />)}

            </div>
            
        </div>
    );
};

export default ViewAllMaterials;