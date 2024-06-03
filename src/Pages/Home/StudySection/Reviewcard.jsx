import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from 'react';

const Reviewcard = () => {
    const [rating, setRating] = useState(0);
    
    return (
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg border-2 dark:bg-gray-800">
            <div className="flex justify-center -mt-16 md:justify-end">
                <img className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt=" avatar" src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80" />
            </div>

            <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">Design Tools</h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!</p>

            <div className="flex justify-between mt-4">
            <Rating style={{ maxWidth: 100 }} value={rating} onChange={false} onHoverChange={false} />
                <a className="text-lg font-medium text-first dark:text-blue-300" tabIndex="0" role="link">John Doe</a>
            </div>
        </div>
    );
};


export default Reviewcard;