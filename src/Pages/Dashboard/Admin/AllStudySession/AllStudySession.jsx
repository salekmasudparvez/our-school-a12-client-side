import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AllStudySessionsRow from './AllStudySessionsRow';
import useAuth from '../../../../Hook/useAuth';
import { Hourglass } from 'react-loader-spinner';

const AllStudySession = () => {
    const { user } = useAuth();
    const [loading, setloading] = useState(false)
    const [tabIndex, setTabIndex] = useState(0);
    const [Status,setStatus]=useState("");

    const { isLoading, refetch, data: allStudySessions } = useQuery({
        queryKey: ['allStudySessions', tabIndex],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/allsessions?id=${tabIndex}`)
            const data = res.data;
            // console.log(data, tabIndex)
            return data;
        }
    })



    if (!user || isLoading || loading) {
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
    const table = <>
        <div className=" min-h-screen ">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Session&apos;s Drescription</th>
                        <th> {Status==="approved"?<><span className='text-sky-500'>Update</span> / <span className='text-red-500'>Delete</span></>:<><span className='text-green-500'>Approved</span> / <span className='text-red-500'>Reject</span></>}</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {/* row */}
                    {allStudySessions?.map((session, idx) => <AllStudySessionsRow key={idx} idx={idx} refetch={refetch} setloading={setloading} session={session} setStatus={setStatus} />)}

                </tbody>
            </table>
        </div>
    </>

    return (<div
        className='p-3 relative overflow-x-auto'>
        <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>

            <TabList>
                <Tab>Pending Sessions</Tab>
                <Tab>Rejected Sessions</Tab>
                <Tab>Approved Sessions</Tab>
            </TabList>
            <TabPanel>
                {table}
            </TabPanel>
            <TabPanel>
                {table}
            </TabPanel>
            <TabPanel>
                {table}
            </TabPanel>
        </Tabs>
    </div>
    );
};

export default AllStudySession;