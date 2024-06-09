import { useQuery } from "@tanstack/react-query";
import HeaderTitle from "../../../Components/HeaderTitle";
import StudySectionCard from "./StudySectionCard";
import axios from "axios";
import { Link } from "react-router-dom";


const StudySection = () => {

const {data:sessions}=useQuery({
  queryKey: ["studySection"],
  queryFn: async () => {
    const response = await axios.get("http://localhost:5000/sessions")
    const data = response.data
    return data;
  },
})

    return (
        <div>
            <HeaderTitle heading="Study Time" title="Find all the study sessions easily, and don&#39;t be late." />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 place-items-center py-7 px-3">
             {
              sessions?.slice(0,3).map((session,idx)=><StudySectionCard key={idx} session={session} ></StudySectionCard>)
             }
            </div>
            <div className="flex justify-center items-center ">
                <Link to='/viewstudysessionshome' className="btn rounded border-second hover:bg-first hover:text-white btn-outline">See All</Link>
            </div>
            
        </div>
    );
};

export default StudySection;