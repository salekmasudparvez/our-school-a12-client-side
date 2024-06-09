import { useQuery } from "@tanstack/react-query";
import HeaderTitle from "../../../Components/HeaderTitle";
import StudySectionCard from "./StudySectionCard";
import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";


const ViewAllSessionsHome = () => {
    const [itemPerPage, setItemPerPage] = useState(6);
    const { count } = useLoaderData();
    const numberOfPages = Math.ceil(count / itemPerPage);
    const pages = [...Array(numberOfPages).keys()];
    const [currentPage, setCurrentPage] = useState(0);

    const { isPending, isFetching, data: sessionData } = useQuery({
        queryKey: ['roomsdata', currentPage, itemPerPage],
        queryFn: async () => {
            let url = `http://localhost:5000/sessions?page=${currentPage}&size=${itemPerPage}`;

            try {
                const res = await fetch(url);
                return res.json();
            } catch (error) {
                 console.error('Error fetching room data:', error);
            }
        }
    });
    const handlePerPage = (e) => {
        const customItemPerPage = parseInt(e.target.value);
        setItemPerPage(customItemPerPage);
        setCurrentPage(0)
    }
    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    if (isFetching || isPending) {
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
        <div className="pt-[100px]">
            <HeaderTitle heading="All Sessions" title="Awsome sessions for fresh students to kickstart their learning journey with foundational knowledge and hands-on experience in various subjects"></HeaderTitle>
            <div className="grid lg:grid-cols-3 pt-10 md:grid-cols-2 grid-cols-1 gap-3 place-items-center px-3">
                {
                    sessionData?.map((session, idx) => <StudySectionCard key={idx} session={session} ></StudySectionCard>)
                }
            </div>
            <div className='flex flex-col md:flex-row py-10 gap-7 justify-center items-center'>
                <div className='flex gap-6'>
                    <a className="btn btn-sm bg-first" onClick={handlePrevPage}>Prev.</a>

                    {pages.map(page => <button
                        className={`btn btn-sm ${currentPage === page ? "bg-first text-white" : ""}`}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)}
                    <a className="btn btn-sm bg-first" onClick={handleNextPage}>Next</a>
                </div>
                <div className="flex bg-neutral-300 p-2 rounded-md">
                    <div className="font-medium text-gray-600 font-serif">Item per page</div>
                    <select value={itemPerPage} onChange={handlePerPage} >
                        <option value="6">06</option>
                        <option value="9">09</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>
            </div>

        </div>
    );
};

export default ViewAllSessionsHome;