import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../../../Hook/useAuth';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Icon } from '@iconify/react/dist/iconify.js';

const Reviews = () => {
    const [rating, setRating] = useState(0);
    const {user} =useAuth();
    const getParamsId = useParams();
    const [reviewBtnLoading,setReviewBtnLoading] = useState(false);

    console.log(getParamsId)
    console.log(user)
    const handleReview =async(e)=>{
        e.preventDefault();
        setReviewBtnLoading(true)
        if(rating===0){
            return toast.error('Please select a rating')
        }
        const comment =e.target.review.value;
        const newReview ={
            rating:rating,
            review:comment,
            studentName:user.displayName,
            studentImageUrl:user.photoURL ||"https://i.ibb.co/Qr9pWXJ/unknown.webp",
            reviewId:getParamsId.id,
            

        }
        try {
            await axios.post('https://server-study.vercel.app/reviews',newReview)
            .then(res=>{
                console.log(res.data);
                toast.success('Your review has been submitted');
                setReviewBtnLoading(false)
            })
        } catch (error) {
            toast.error(error);
            setReviewBtnLoading(false)
        }

    }
    return (
        <div className="flex flex-col w-full p-8 shadow-sm rounded-xl lg:p-12  text-second">
            <form onSubmit={handleReview} className="flex flex-col items-center w-full">
                <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-center">How was your experience?</span>
                    <div className=''><Rating style={{ maxWidth: 250 }} value={rating} onChange={setRating} /></div>
                </div>
                <div className="flex flex-col w-full">
                    <textarea required name='review' rows="3" placeholder="Message..." className="p-4 border border-second focus:outline-none rounded-md resize-none text-gray-900 bg-gray-100"></textarea>
                   <button type="submit" className="btn my-8 font-semibold rounded-md text-gray-100 hover:text-gray-700 bg-first">{reviewBtnLoading? <Icon className="text-3xl animate-spin mx-auto" icon="solar:black-hole-3-line-duotone" />:"Give review"} </button>
                </div>
            </form>
        </div>
    );
};

export default Reviews;