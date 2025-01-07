import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as reviewsAction from '../../store/review';
import './ListingSpotReviews.css';


function ListingSpotReviews({spotId}) {
    const dispatch = useDispatch();
    const reviewObj = useSelector(state => state.reviews);
    const reviews = Object.values(reviewObj.spot);
    const spotReviews = [];
    for (let review of reviews) {
        if (review.spotId === +spotId) {
            spotReviews.push(review);
        }
    }
    const totalReviews = spotReviews.length;

    useEffect(() => {
        dispatch(reviewsAction.allSpotReviews(spotId))
    }, [dispatch, spotId])

    return (
        <div className="reviews-container">
            <h2>Total Reviews: {totalReviews}</h2>
            <div className="reviews-card">
                {spotReviews?.length > 0 && spotReviews.map(review => (
                    <div key={review.id} className='review-user-container'>
                        <div className="reviewer-info">
                            <div className="review-name">{review.User.firstName}</div>
                            <div>
                                <img src='https://cdn.iconscout.com/icon/free/png-512/free-profile-icon-download-in-svg-png-gif-file-formats--user-avatar-man-interface-vol-3-pack-icons-1163876.png?f=webp&w=256' alt='profile-icon' className="user-profile"/>
                            </div>
                        </div>
                        <div className="review-content">{review.review}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default ListingSpotReviews
