import { Icon } from '@iconify/react/dist/iconify.js';
import { PropTypes } from 'prop-types';

const ViewAllSessionCard = ({ session }) => {
    const {

        SessionDescription,
        SessionTitle,
        Status
    } = session
    
    return (
        <>
            <div className="mb-10 overflow-hidden relative rounded-lg bg-white shadow-md duration-300 hover:shadow-xl dark:bg-dark-2 ">
                {/* <img src={Image} alt="" className="w-full " /> */}
                {Status === "pending" ? (
                    <div className="badge bg-[#F5E460] absolute top-1 right-1 text-white gap-2">
                        <Icon icon="eos-icons:bubble-loading" />
                        Pending
                    </div>
                ) : Status === "approved" ? (
                    <div className="badge badge-success absolute top-1 right-1 text-white gap-2">
                        <Icon className='text-green-200' icon="icon-park-solid:success" />
                        Approved
                    </div>
                ) : Status === "rejected" ? (
                    <div className="badge absolute top-1 right-1 text-white badge-error gap-2">
                        <Icon className='text-red-200' icon="oui:cross-in-circle-filled" />
                        Rejected
                    </div>
                ) : null}
                <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
                    <h3>
                        <a className="mb-4 block text-xl font-semibold text-dark hover:text-first dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] uppercase" >
                            {SessionTitle}
                        </a>
                    </h3>
                    <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
                        {SessionDescription}
                    </p>
                    {Status === "pending" ? (
                        <button className='btn-disabled disabled:bg-info btn rounded-full border border-gray-3  text-base font-medium text-body-color transition hover:border-second hover:bg-first hover:text-white dark:border-dark-3 dark:text-dark-6'>
                            Waiting for Admin approval
                        </button>
                    ) : Status === "approved" ? (
                        <button className='flex whitespace-nowrap text-center mx-auto rounded-full px-2 py-1 border-gray-3  text-base font-medium border border-green-500'>
                            <span><Icon className='text-green-600  text-3xl' icon="icon-park-solid:success" /></span>Approved
                        </button>
                    ) : Status === "rejected" ? (
                        <button className='btn rounded btn-error border border-gray-3  text-base font-medium text-body-color transition hover:border-second hover:bg-first hover:text-white dark:border-dark-3 dark:text-dark-6'>
                        Re-check
                    </button>
                    ) : null}

                </div>
            </div>
        </>
    )
};
ViewAllSessionCard.propTypes = {
    session: PropTypes.object.isRequired,
}
export default ViewAllSessionCard;