
import { PropTypes } from 'prop-types';

const TutorCard = ({tutor}) => {
    const{name,image,role}=tutor
   // console.log(tutor)
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
           
            <div className="flex flex-col pt-10 items-center pb-10">
                <img className="w-24 h-24 mb-3 object-cover rounded-full shadow-lg" src={image} alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
                
            </div>
        </div>

    );
};
TutorCard.propTypes={
    tutor:PropTypes.object.isRequired,
}
export default TutorCard;