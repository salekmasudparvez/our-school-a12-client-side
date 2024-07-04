import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AllStudySessionsRow from './AllStudySessionsRow';
import useAuth from '../../../../Hook/useAuth';
import { Hourglass } from 'react-loader-spinner';
import toast from 'react-hot-toast';

const AllStudySession = () => {
    const [open, setOpen] = useState({ modal: false, id: "", session: {} });
    const fee = useRef(null)
    const { user } = useAuth();
    const [loading, setloading] = useState(false)
    const [tabIndex, setTabIndex] = useState(0);
    const [Status, setStatus] = useState("");
    const [openFeedBack, setOpenFeedBack] = useState({ modal: false, id: "" })
    const feedBack = useRef(null)
    const reason = useRef(null)
    const [openDelete, setOpenDelete] = useState({modal:false,id:""});

    const { isLoading, refetch, data: allStudySessions } = useQuery({
        queryKey: ['allStudySessions', tabIndex],
        queryFn: async () => {
            const res = await axios.get(`https://server-study.vercel.app/allsessions?id=${tabIndex}`)
            const data = res.data;
            // console.log(data, tabIndex)
            return data;
        }
    })
    const handleConfirm = async () => {

        setloading(true);
        const updateDoc = { id: open?.id, status: 'approved', sessionObject: open?.session, fee: fee.current.value }
        console.log(updateDoc)
        if (!open.id || !open.status || !open.session) {
            return toast.error('Something went wrong')
        }

        await axios.patch('https://server-study.vercel.app/allsessionsstatus', updateDoc)
            .then(res => {
                console.log(res)
                refetch()
                setloading(false)
            })
        setOpen({ modal: false, id: "" })
        setloading(false)

    }
   
    const handleRejection = async () => {
    
        if (!feedBack.current.value || !reason.current.value) {
            setloading(false);
            return toast.error('Please give your feedback');
        }
    
        const updateDoc = {
            id: openFeedBack?.id,
            status: 'rejected',
            feedBackPart: {
                reason: reason.current.value,
                feedback: feedBack.current.value,
            },
        };
    
        console.log(updateDoc);
    
        try {
            const res = await axios.patch('https://server-study.vercel.app/allsessionsstatus', updateDoc);
            console.log(res);
            refetch();
            setloading(false);
        } catch (error) {
            console.error(error);
            setloading(false);
            toast.error('Failed to update session status');
        }
    
        setOpen({ modal: false, id: "" });
        setloading(false);
    };
    const handleDelete = async () => {     
        setloading(true);
        try {
            await axios.delete(`https://server-study.vercel.app/deleteSession/${openDelete.id}`)
                .then(res => {
                    console.log(res)
                    refetch()
                    setloading(false)
                })
        } catch (error) {
            toast.error(error);
            setloading(false)
        }
        setloading(false)
        setOpenDelete({ modal: false, id: "" })
    }

    

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
            <div className="max-h-[calc(100vh-37px)] ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Session&apos;s Drescription</th>
                            <th> {Status === "approved" ? <><span className='text-sky-500'>Update</span> / <span className='text-red-500'>Delete</span></> : <><span className='text-green-500'>Approved</span> / <span className='text-red-500'>Reject</span></>}</th>
                        </tr>
                    </thead>
                    <tbody className='max-h-[calc(100vh-77px)] overflow-y-auto'>
                        {/* row */}
                        {allStudySessions?.map((session, idx) => <AllStudySessionsRow
                            key={idx}
                            idx={idx}
                            setOpen={setOpen}
                            session={session}
                            setStatus={setStatus}
                            setOpenFeedBack={setOpenFeedBack}
                            setOpenDelete={setOpenDelete}
                        />)}

                    </tbody>
                </table>
            </div>
        </>

        return (<>
            <div
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
            {/* confirm modal */}
            <div className={`absolute top-0 left-0 w-full px-3 h-screen   ${open.modal ? 'flex' : 'hidden'} backdrop-blur-md justify-center items-center`}>
                <div className="flex flex-col lg:max-w-xl items-center md:max-w-lg max-w-md w-full gap-2 p-6 rounded-md shadow-md bg-gray-200 text-second">
                    <h2 className="text-xl font-semibold leading-tight text-center tracking-wide">Session Fee</h2>
                    <input name="fee" ref={fee} type="number" defaultValue="0" placeholder="Type here" className="input w-full max-w-xs" />
                    <div className="flex justify-center  gap-3 mt-6 flex-row-reverse">
                        <button onClick={() => setOpen({ modal: false, id: "" })} className="btn hover:text-black rounded-sm shadow-sm bg-red-400 text-gray-100">Cancel</button>
                        <button onClick={handleConfirm} className="btn hover:text-black rounded-sm shadow-sm bg-first text-white">Confirm Approval</button>
                    </div>
                </div>
            </div>
            {/* feedback */}
            <div className={`absolute top-0 left-0 w-full px-3 h-screen  ${openFeedBack.modal ? 'flex' : 'hidden'} backdrop-blur-md justify-center items-center`}>
                <div className="flex flex-col lg:max-w-xl items-center md:max-w-lg max-w-md w-full gap-2 p-6 rounded-md shadow-md bg-gray-200 text-second">
                    <h2 className="text-xl font-semibold leading-tight text-center tracking-wide">Feedback</h2>
                    <input ref={reason} name="feedBack" type="text" placeholder="Rejection's reason" className="input w-full max-w-xs" />
                    <input ref={feedBack} name="feedBack" type="text" placeholder="Feedback" className="input w-full max-w-xs" />
                    <div className="flex justify-center  gap-3 mt-6 flex-row-reverse">
                        <button onClick={() => setOpenFeedBack({ modal: false, id: "" })} className="btn hover:text-black rounded-sm shadow-sm bg-red-400 text-gray-100">Cancel</button>
                        <button onClick={handleRejection} className="btn hover:text-black rounded-sm shadow-sm bg-first text-white">Reject Approval</button>
                    </div>
                </div>
            </div>
            {/* modal delete */}
            <div className={`absolute top-0 left-0 w-full px-3 h-screen  ${openDelete.modal ? 'flex' : 'hidden'} backdrop-blur-md justify-center items-center`}>
                <div className="flex flex-col lg:max-w-xl items-center md:max-w-lg max-w-md w-full gap-2 p-6 rounded-md shadow-md bg-gray-200 text-second">
                    <h2 className="text-xl font-semibold leading-tight text-center tracking-wide">Are you sure?</h2>
                    <p className='text-center'>You won&apos;t be able to revert this!</p>
                    <div className="flex justify-center  gap-3 mt-6 flex-row-reverse">
                        <button onClick={() => setOpenDelete({modal:false,id:""})} className="btn hover:text-black rounded-sm shadow-sm bg-red-400 text-gray-100">Cancel</button>
                        <button onClick={handleDelete} className="btn hover:text-black rounded-sm shadow-sm bg-first text-white">Yes,delete it !</button>
                    </div>
                </div>
            </div>
        </>
        );
    };

    export default AllStudySession;