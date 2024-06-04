
import { Icon } from '@iconify/react/dist/iconify.js';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
const BookSessionRow = ({ name, sessionStart, handleNavidate, _id,idx }) => {
  
    return (
        <tr className="rounded hover:bg-second hover:bg-opacity-20">
            <th>{idx+1}</th>
            <td>{name}</td>
            <td>{sessionStart}</td>
            <td><button onClick={() => handleNavidate(_id)} className="cursor-pointer hover:bg-sky-500 flex md:py-2 px-2 items-center whitespace-nowrap gap-1 justify-center rounded bg-first  text-white"><Icon className='text-white' icon="ph:eye-thin" />View</button></td>
            <td ><Link to={`/dashboard/reviews/${_id}`}  className="cursor-pointer hover:bg-sky-500 flex md:py-2 px-2 items-center whitespace-nowrap gap-1 justify-center rounded bg-first  text-white"><Icon className='text-white' icon="material-symbols:reviews" /><span>Review</span></Link></td>
        </tr>
    );
};
BookSessionRow.propTypes = {
    name: PropTypes.string.isRequired,
    sessionStart: PropTypes.string.isRequired,
    handleNavidate: PropTypes.func.isRequired,
    handleReview: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired,
    idx: PropTypes.number.isRequired,
}
export default BookSessionRow;