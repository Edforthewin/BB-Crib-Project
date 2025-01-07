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

    const handleCancelButton = (e) => {
        e.preventDefault();
        modal();
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
                            {errors.map(error =>
                                <li key={error}>{error}</li>)}
                        </ul>
                    }
                </div>
                <div className='review-content'>
                    <div className='reviewForm-rating'>
                        <label> Rating point:
                            <input
                                type='number'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                min="1"
                                max="5"
                                required
                            />
                        </label>
                    </div>
                    <div className='reviewform-description'>
                        <label>
                            <textarea
                                placeholder='Share the experience you had at this crib'
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                className='input-field'
                                required
                            >
                            </textarea>
                        </label>
                    </div>
                    <div className='review-button'>
                        <button type='submit' className='button-post'>Post</button>
                        <button onClick={handleCancelButton} className='button-cancel'>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default ReviewForm
