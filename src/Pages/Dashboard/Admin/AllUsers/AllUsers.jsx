import { Icon } from "@iconify/react/dist/iconify.js";
import UserRow from "./UserRow";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../../../Hook/useAuth";
import { useRef, useState } from "react";
import { Hourglass } from "react-loader-spinner";



const AllUsers = () => {
    const search = useRef()
    const { user } = useAuth();
    const [inputSearch, setinputSearch] = useState()
    const handleSearch = async (e) => {
        e.preventDefault()
        const searchInput = e.target.search.value;
        setinputSearch(searchInput)
        console.log(e.target)
        
    }

    const [loadingUpdate, setloadingUpdate] = useState(false)
    const { refetch, isLoading, data: allusers } = useQuery({
        queryKey: ['allusers', inputSearch],
        queryFn: async () => {
            if (inputSearch) {
                let url = `http://localhost:5000/allusers?search=${inputSearch}`
                if(/.+@.+\..+/.test(inputSearch)) {
                    url=`http://localhost:5000/allusers?email=${inputSearch}`
                }
                const res = await axios.get(url);
                const data = res.data;
                console.log(data);
                return data;
            }
            const res = await axios.get('http://localhost:5000/allusers');
            const data = res.data;
            return data;
        }
    });
    if (!user || isLoading || loadingUpdate) {
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
        <div className="w-full min-h-screen">
            {/* NAV */}
            <div className="flex justify-evenly w-full items-center min-h-16 border-b shadow-md">
                <div>
                    <h1 className="text-xl font-bold whitespace-nowrap text-first">All Users</h1>
                </div>
                <fieldset className=" space-y-1 text-gray-700">
                    <label htmlFor="Search" className="hidden">Search</label>
                    <form onSubmit={handleSearch} className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                            <button type="submit" title="search" className="">
                                <Icon className="text-xl" icon="iconamoon:search-thin" />
                            </button>
                        </span>
                        <input ref={search} type="search" name="search" placeholder="Search name or email" className="px-2 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-50 text-gray-600 focus:bg-gray-200" />

                    </form>
                </fieldset>
            </div>
            {/* BODY */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                Serial
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Update role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row  */}
                        {allusers?.map((user, idx) => <UserRow key={idx} user={user} setloadingUpdate={setloadingUpdate} refetch={refetch} idx={idx} />)}

                    </tbody>



                </table>
            </div>

        </div>
    );
};

export default AllUsers;