import AllMaterialsRow from "./AllMaterialsRow";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from "../../../../Hook/useAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";



const AllMaterials = () => {
    const { user } = useAuth()
    const {isLoading,refetch, data: allmaterials } = useQuery({
        queryKey: 'allMaterials',
        queryFn: async () => {
            const res = await axios(`http://localhost:5000/materials/${user.email}`)
            const data = await res.data
            return data
        }
    })
   
    if(!user || isLoading){
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

    if ( allmaterials?.length === 0|| !allmaterials) {
        return (
            <section className="flex items-center h-full sm:p-16 text-gray-700">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
                    <Icon className="text-9xl" icon="openmoji:sad-but-relieved-face"/>
                    <p className="text-3xl">Looks like you haven&apos;t added any material.</p>
                    <Link to="/dashboard/tutor/UploadMaterials" href="#" className="px-8 py-3 font-semibold rounded bg-first text-gray-100">Back to Upload Materials</Link>
                </div>
            </section>
        )
    } else {
        return (
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Drive Link</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allmaterials?.map((material, idx) => <AllMaterialsRow key={idx} material={material} refetch={refetch} />)}

                    </tbody>
                </table>
            </div>
        );
    }
};

export default AllMaterials;