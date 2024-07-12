import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { PropTypes } from 'prop-types';

const Reviewcard = ({singleReview}) => {
   //console.log(singleReview)
     const {name,image,title,review,rating} = singleReview;   
    return (
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg border-2 dark:bg-gray-800">
            <div className="flex justify-center -mt-16 md:justify-end">
                <img className="object-cover w-20 h-20 border-2 border-blue-500 bg-white rounded-full dark:border-blue-400" alt=" avatar" src={image || "https://i.ibb.co/Qr9pWXJ/unknown.webp"} />
            </div>

            <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">{title}</h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">{review}</p>

            <div className="flex justify-between mt-4">
            <Rating style={{ maxWidth: 100 }} value={rating} onChange={false} onHoverChange={false} />
                <a className="text-lg font-medium text-first dark:text-blue-300" tabIndex="0" role="link">{name}</a>
            </div>
        </div>
    );
  
};

Reviewcard.propTypes ={
    singleReview:PropTypes.obj
}
export default Reviewcard;