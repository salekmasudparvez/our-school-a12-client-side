
import axios from 'axios';
import AllStudySessionsRow from './AllStudySessionsRow';
import { useQuery } from '@tanstack/react-query';
import { PropTypes } from 'prop-types';

const AllStudySectionTale = ({tabIndex,setLoading}) => {
    const { isLoading,data:allStudySessions } = useQuery({
        queryKey: ['allStudySessions', tabIndex],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/allsessions?id=${tabIndex}`)
            const data = res.data;
            console.log(data,tabIndex)
            return data;
        }
    })
    if(isLoading){
        setLoading(true)
    }else{
        setLoading(false)
    }
    return (
       
             <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Job</th>
                                <th>Favorite Color</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row */}
                            {allStudySessions?.map((session,idx) =><AllStudySessionsRow key={idx} idx={idx} session={session}/>)}
                           
                        </tbody>
                    </table>
                </div>
       
    );
};
AllStudySectionTale.propTypes={
    tabIndex:PropTypes.number.isRequired,
    setLoading:PropTypes.func.isRequired,
}
export default AllStudySectionTale;