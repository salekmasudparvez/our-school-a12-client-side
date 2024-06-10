
import { useQuery } from "@tanstack/react-query";
import HeaderTitle from "../../../Components/HeaderTitle";
import TutorCard from "./TutorCard";
import axios from "axios";
import { Hourglass } from "react-loader-spinner";
import { Link } from "react-router-dom";

const Tutors = () => {
    const { isLoading, data: tutors } = useQuery({
        queryKey: ["Alltutors"],
        queryFn: async () => {
            const response = await axios.get("https://server-study.vercel.app/alltutors")
            const data = response.data
            return data;
        }
    })
    if (isLoading) {
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
        <div className="lg:py-10 py-6 space-y-3">
            <HeaderTitle heading="Meet our tutors" title="Our teachers are exceptionally hardworking and talented, dedicated to fostering students' growth and success through their expertise and commitment." />
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 place-items-center px-3">
                {tutors?.slice(0, 3).map((tutor,idx)=><TutorCard key={idx} tutor={tutor} ></TutorCard>)}
            </div>
            <div className="flex justify-center items-center ">
                <Link to='/alltutors' className="btn rounded border-second hover:bg-first hover:text-white btn-outline">See All</Link>
            </div>

        </div>
    );
};

export default Tutors;