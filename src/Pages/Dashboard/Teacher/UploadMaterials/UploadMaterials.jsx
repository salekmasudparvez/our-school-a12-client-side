import { useQuery } from "@tanstack/react-query";
import HeaderTitle from "../../../../Components/HeaderTitle";
import UploadCard from "./UploadCard";
import axios from "axios";
import useAuth from "../../../../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";


const UploadMaterials = () => {
    const{user}=useAuth()

    const {isLoading,data:approvedSessions}=useQuery({
        queryKey:['approvedSessions'],
        queryFn:async()=>{
            const url=`http://localhost:5000/approvedsessions/${user.email}`
            console.log('url',url)
            const res = await axios.get(url);
            const data = res.data;
            return data;
            
            
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
        <div>
            <HeaderTitle heading="Upload Materials" title="Upload your approved session's materials for student" />
            <div className="px-3 md:px-8">

               <div className="grid grid-cols-1  md:grid-cols-2 place-items-center px-3">
                {/* see:{approvedSessions.length} */}
                {approvedSessions?.map((session,idx)=><UploadCard key={idx} session={session} />)}
               </div>

            </div>
        </div>
    );
};

export default UploadMaterials;