import { useQuery } from "@tanstack/react-query";
import BookSessionRow from "./BookSessionRow";
import axios from "axios";
import useAuth from "../../../../Hook/useAuth";
import { useNavigate } from "react-router-dom";


const BookedSession = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleNavidate = (id) => {
        navigate(`/details/${id}`)
    }
  

    const { isPending, data: bookedSeessions } = useQuery({
        queryKey: "bookedsessiontable",
        queryFn: async () => {
            const response = await axios(`https://server-study.vercel.app/bookedsessiontable/${user.email}`)
            const data = response.data
            // console.log(data);
            return data;
        }
    })
    if (!user || isPending) {
        return <div className="flex justify-center items-center w-full text-red-500 h-screen"><span className="loading loading-spinner loading-lg"></span></div>
    }
    return (
        <div className="overflow-x-auto w-full ">
            <table className="table w-full ">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Session Start</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {bookedSeessions?.map((session, idx) => <BookSessionRow
                        key={idx}
                        idx={idx}
                       
                        name={session.SessionTitle}
                        sessionStart={session.ClassStartDate}
                        _id={session.BookId}
                        handleNavidate={handleNavidate}
                    ></BookSessionRow>
                    )}


                </tbody>
            </table>

        </div>
    );
};

export default BookedSession;