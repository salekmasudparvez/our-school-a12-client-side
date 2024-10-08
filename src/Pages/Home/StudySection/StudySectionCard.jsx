
import { Icon } from '@iconify/react/dist/iconify.js';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import {  isBefore }  from "date-fns";

const StudySectionCard = ({ session }) => {
    const {
       
        SessionDescription,
        SessionTitle,
        ClassEndDate,
        _id
    } = session
    console.log()

    return (
        <div className="mb-10 overflow-hidden flex flex-col justify-center items-center relative rounded-lg bg-white h-full  shadow-md duration-300 hover:shadow-xl dark:bg-dark-2 ">
            {/* <img src={Image} alt="" className="w-full " /> */}
            {isBefore(new Date,ClassEndDate) ?
                <div className="badge badge-success absolute top-1 right-1 text-white gap-2">
                    <Icon icon="icon-park:check-correct" />
                    Ongoing
                </div> :
                <div className="badge absolute top-1 right-1 text-white badge-error gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    Closed
                </div>
            }
            <div className="p-8  text-center sm:p-9 md:p-7 xl:p-9">
                <h3>
                    <a className="mb-4 block text-xl font-semibold text-dark hover:text-first dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] uppercase" >
                        {SessionTitle}
                    </a>
                </h3>
                <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                    {SessionDescription}
                </p>

                
                    <Link to={`/details/${_id}`} className="btn rounded-full border border-gray-3  text-base font-medium text-body-color transition hover:border-second hover:bg-first hover:text-white dark:border-dark-3 dark:text-dark-6 ">
                        Read more
                    </Link>
            
            </div>
        </div>
    );
};

StudySectionCard.propTypes = {
    session: PropTypes.obj
}

export default StudySectionCard;