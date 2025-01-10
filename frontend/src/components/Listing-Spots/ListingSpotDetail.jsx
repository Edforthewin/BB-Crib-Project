import { useEffect } from 'react';
import { fetchOneSpot } from '../../store/spots';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as reviewsAction from '../../store/review';
import * as bookingAction from '../../store/booking'
import ReviewSpotModal from "../Reviews/ReviewForm/ReviewFormModal";
import DeleteReviewModal from "../Reviews/DeleteReviewModal";
import './ListingSpotDetail.css';

function SpotDetail() {
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots);
    const spot = spotObj.singleSpot;
    const reviewObj = useSelector(state => state.reviews);
    const spotReviews = Object.values(reviewObj.spot);
    // const spotBooking = useSelector(state => state.bookings.spot)
    const { spotId } = useParams();
    let sum = 0;
    let avgRating = 0;

    for(let review of spotReviews) {
        sum += review.stars;
    }
    if (sum > 0 ) {
        avgRating = (sum / spotReviews.length).toFixed(2);
    }

    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(fetchOneSpot(spotId));
        dispatch(reviewsAction.allSpotReviews(spotId))
    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(bookingAction.fetchSpotBookings(spotId));
    }, [dispatch, spotId]);

    if (spot && spot.statusCode) return (
        <div className='not-found'>
            <h2>
                Hmmm, spot not found
            </h2>
        </div>
    );

    return (
        <div className='spot-container'>
            <div className='spot-info'>
                <h2 className='spot-info-firstline'>{spot.name}</h2>
                <div className='spot-info-secondline'>
                    <i className='fa-solid fa-star'></i>
                    {avgRating}, {spotReviews.length} reviews, {spot.city}, {spot.state}, {spot.country}
                </div>
            </div>
            <div className='spot-photo'>
                {spot.SpotImages?.length > 0 &&
                    <div className='spot-photo-container photo one'>
                        <img src={spot.SpotImages[0].url} alt='spot'/>
                    </div>
                }
                <div className='spot-photo-container photo-four'>
                    <div className='photo-four-1'>
                        <img src='https://images.pexels.com/photos/6775271/pexels-photo-6775271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='spot'/>
                    </div>
                    <div className='photo-four-1'>
                        <img src='https://images.pexels.com/photos/5411808/pexels-photo-5411808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='spot' className='photo-border1'/>
                    </div>
                    <div className='photo-four-1'>
                        <img src='https://images.pexels.com/photos/7649103/pexels-photo-7649103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='spot'/>
                    </div>
                    <div className='photo-four-1'>
                        <img src='https://images.pexels.com/photos/7649103/pexels-photo-7649103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='spot' className='photo-border2'/>
                    </div>
                </div>
            </div>
            <div className='spot-detail-container'>
                <div className='spot-host-container'>
                    <div className='spot-host'>
                        {spot.Owner &&
                            <div className='host-name'>
                                <h2>This crib is hosted by {spot.Owner.firstname}</h2>
                            </div>

                        }
                        <div>
                            <img src='https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg' alt='black' className='profile-photo'/>
                        </div>
                    </div>
                </div>
                <div className='spot-mockup1'>
                    <div className='mockup-item'>
                        <i className='fa-solid fa-check'></i> Self Checkin
                    </div>
                    <div className='mockup-item'>
                        <i className='fa-solid fa-location-pin'></i> Great Location
                    </div>
                    <div className='mockup-item'>
                        <i className='fa-solid fa-calender'></i> Free Cancellation for 24hours.
                    </div>
                </div>
                <div className='spot-mockup'>
                    <div>
                        <h2>What we cover</h2>
                    </div>
                    <div className='mockup-para'>
                        <p>Ever booking includes free protection from Host cancellations, lsiting inaccuracies, and other issues like trouble checking in.</p>
                    </div>
                </div>
                <div className='spot-desc'>
                    <div className='spot-h2'>
                        <h2>About this spot</h2>
                    </div>
                    <div className='spot-desc-detail'>
                        <p>
                            {spot.description}
                        </p>
                    </div>
                </div>
                <div className="reviews-cards">
                            {spotReviews?.length > 0 && spotReviews.map(review => (
                                <div key={review.id} className='review-user-container'>
                                    <div className="reviewer-info">

                                        <div className="review-user-photo">
                                            <img src='https://www.shareicon.net/data/128x128/2016/06/25/786543_people_512x512.png' alt='dude' className="user-profile"/>
                                        </div>
                                        <div className="review-name">{review.User.firstName}</div>
                                    </div>
                                    <div className="review-description">{review.review}</div>
                                    <div className="review-delete">
                                        {sessionUser && +review.userId === sessionUser.id &&
                                            <DeleteReviewModal reviewId={review.id} spotId={spot.id} />
                                        }

                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='button-newreview'>
                            <ReviewSpotModal spotId={spot.id}/>
                        </div>
            </div>
        </div>
    )

}


export default SpotDetail
