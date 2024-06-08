import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../../Hook/useAuth";
import { Hourglass } from "react-loader-spinner";
import HeaderTitle from "../../../../Components/HeaderTitle";
import ViewAllSessionCard from "./ViewAllSessionCard";


const ViewAllSessions = () => {
    const { user } = useAuth();
    //get pending sessions
    const { refetch,isLoading, data: pendingSessions } = useQuery({
        queryKey: ['sessionsPending'],
        queryFn: async () => {
            const response = await axios(`http://localhost:5000/aceptsession/${user.email}`)
            const data = await response.data
            return data
        }
    })

    if (!user || isLoading) {
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
            <HeaderTitle heading="View All Sessions" title="You can see all the sessions that you have created and waiting for admin approval." />
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-3 place-items-center">
            {pendingSessions?.map((session, idx) =>  <ViewAllSessionCard key={idx} session={session} refetch={refetch} /> )}
            </div>
        </div>
    );
};

export default ViewAllSessions;