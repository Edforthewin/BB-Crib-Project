import { useState } from 'react';
import * as reviewsAction from '../../../store/review';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

function ReviewForm(props) {
    const [rating, setRating] = useState();
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();
    const modal = props.onClose;
    const spotId = props.spotId;
    const sessionUser = useSelector(state => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (!sessionUser) return setErrors(['Please login to this spot'])
            const info = {
                stars: rating, review
        }
        if (!review) return setErrors(['Please input your review!'])
            dispatch(reviewsAction.newReview(spotId, info))
        .then(() => modal())
        .catch(async (res) => {
            const data = await res.json();
            if(data && data.message) {
                if(data.errors) {
                    const error = Object.values(data.errors)
                    return setErrors([error])
                }
                    setErrors(["You already gave this spot a rating!"]);
            }
        });
    }
    return (
        <div className='reviewform-container'>
            <div className='reviewform-welcome'>
                <h2>Rate this spot!</h2>
            </div>
            <form onSubmit={handleSubmit} className='reviewform-info'>
                <div>
                    {errors.length > 0 &&
                        <ul>
                            {errors.map()}
                        </ul>

                    }
                </div>
            </form>
        </div>
    )
}


export default ReviewForm
