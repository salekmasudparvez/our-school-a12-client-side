import { Hourglass } from "react-loader-spinner";
import HeaderTitle from "../../../../Components/HeaderTitle";
import useAuth from "../../../../Hook/useAuth";
import NoteCard from "./NoteCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const Notes = () => {
    const { user } = useAuth()

    //get notes
    const {refetch, data: notes } = useQuery({
        queryKey: ['notes'],
        queryFn: async () => {
            const res = await axios(`http://localhost:5000/notes/${user.email}`)
            const data = await res.data
            return data
        }
    })
    //delete notes



    //loading
    if (!user ) {
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
        <div className="relative">
            <div>
                <HeaderTitle heading="All notes" title="You can view all personal notes.There will be update and delete buttons for each note to update and delete note." />
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-3 px-3">
                    {notes?.map((note, idx) => <NoteCard
                        refetch={refetch}
                        note={note}
                        key={idx}></NoteCard>)}
           
                </div>
            </div>
           
        </div>

    );
};

export default Notes;