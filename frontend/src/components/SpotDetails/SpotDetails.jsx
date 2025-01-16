import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { destroyReview, newReview } from '../../store/review';
import ReviewModal from './ReviewModal';
import './SpotDetails.css';

const SpotDetails = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const [spot, setSpot] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    const [hasReviewed, setHasReviewed] = useState(false);
    const currentUser = useSelector((state) => state.session.user);

    const handleReserveClick = () => {
        alert("Feature coming soon");
    }

    const handleReviewSubmit = async (reviewData) => {
        const reviewPayload = {
            review: reviewData.review,
            stars: reviewData.stars,
        };

        const postNewReview = dispatch(newReview(spotId, reviewPayload));

        if (postNewReview && postNewReview.User) {
            const updatedReviews = [...reviews, postNewReview];

            const totalStars = updatedReviews.reduce((sum, review) => sum + review.stars, 0);
            const avgStarRating = updatedReviews.length > 0 ? (totalStars / updatedReviews.length).toFixed(1) : 0;

            setReviews(updatedReviews);
            setSpot(prevSpot => ({
                ...prevSpot,
                avgStarRating: Number(avgStarRating),
                numReviews: updatedReviews.length,
            }));
            setHasReviewed(true);
        } else {
            const updatedReviewsResponse = await fetch(`/api/spots/${spotId}/reviews`);
            const updatedReviewsData = await updatedReviewsResponse.json();
            setReviews(updatedReviewsData.Reviews);

            const totalStars = updatedReviewsData.Reviews.reduce((sum, review) => sum + review.stars, 0);
            const avgStarRating = updatedReviewsData.Reviews.length > 0 ? (totalStars / updatedReviewsData.Reviews.length).toFixed(1) : 0;

            setSpot(prevSpot => ({
                ...prevSpot,
                avgStarRating: Number(avgStarRating),
                numReviews: updatedReviewsData.Reviews.length,
            }));
            const userReview = updatedReviewsData.Reviews.find(review => review.User.id === currentUser.id);
            setHasReviewed(!!userReview);
        }
        setIsModalOpen(false);
    };

    const handleDeleteReview = (reviewId) => {
        setReviewToDelete(reviewId);
        setIsModalOpen(true)
    };

    const confirmDeleteReview = async () => {
        if(reviewToDelete) {
            const response = dispatch(destroyReview(reviewToDelete, spotId));
            if(response.ok) {
                const updatedReviews = reviews.filter(review => review.id !== reviewToDelete);
                setReviews(updatedReviews);

                const totalStars = updatedReviews.reduce((sum, review) => sum + review.stars, 0);
                const avgStarRating = updatedReviews.length > 0 ? (totalStars / updatedReviews.length).toFixed(1) : 0;

                setSpot(prevSpot => ({
                    ...prevSpot,
                    avgStarRating: Number(avgStarRating),
                    numReviews: updatedReviews.length,
                }));
                const userHasReviews = updatedReviews.some(review => review.User.id === currentUser.id);
                setHasReviewed(userHasReviews);
            }
        }
        setReviewToDelete(null);
        setIsModalOpen(false);
    };

    const cancelDeleteReview = () => {
        setReviewToDelete(null);
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchSpotDetails = async () => {
            try {
                const response = await fetch (`/api/spots/${spotId}`);
                const data = await response.json();
                setSpot(data);

                const reviewsResponse = await fetch(`/api/spots/${spotId}/reviews`);
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData.Reviews);
                const userReview = reviewsData.Reviews.find(review => review.User.id === currentUser.id);
                setHasReviewed(!!userReview);
            } catch(error) {
                console.error("Error fetching spot details or reviews:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSpotDetails();
    }, [spotId, currentUser]);

    if(loading) {
        return <div>Loadin...</div>;
    }

    if(!spot) {
        return <div>Crib not found</div>;
    }

    return (
        <div className="spot-details">
            <div className="details-container">
                <h1>{spot.name}</h1>
                <p className="location">{spot.city}, {spot.state}, {spot.country}</p>
            </div>

            {/* Image Container */}
            <div className="image-container">
                <div className="previewImage-container">
                    {spot.SpotImages.length > 0 && (
                        <img className="previewimage" src={spot.SpotImages[0].url} alt={spot.name} />
                    )}
                </div>
                <div className="thumbnailImages-container">
                    {spot.SpotImages.slice(1).map(image => (
                        <div className="thumbnailimage-box" key={image.id}>
                            <img className="thumbnailimage" src={image.url} alt={spot.name} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Details Body */}
            <div className="detailsbody">
                <div className="leftdetails">
                    <div className="hostname">
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    </div>
                    <div className="description">
                        <p>{spot.description}</p>
                    </div>
                </div>

                <div className="rightdetails">
                    <div className="callout-box">
                       <div className="calloutbox-top"><h3>${spot.price.toFixed(2)} night</h3>
                       <div className="calloutbox-review"><span role="img" aria-label="star">⭐</span>
                            <span>{spot.numReviews > 0 ? spot.avgStarRating.toFixed(1) : "New"}</span>
                            {spot.numReviews > 0 && (
                                <>
                                    <span> • </span>
                                    <span>{spot.numReviews} Review{spot.numReviews !== 1 ? 's' : ''}</span>
                                </>
                            )}</div>


                            </div>

                        <button className="calloutbox-bottom" onClick={handleReserveClick}>Reserve</button>
                    </div>
                </div>
            </div>

            <hr style={{ margin: '20px 0' }} />

            <div className="reviews-summary">
                <span role="img" aria-label="star">⭐</span>
                {spot.numReviews > 0 ? (
                    <>
                        <span>{spot.avgStarRating.toFixed(1)} </span>
                        <span> • </span>
                        <span>{spot.numReviews} review{spot.numReviews !== 1 ? 's' : ''}</span>
                    </>
                ) : (
                    <span>New</span>
                )}
            </div>

            {/* Review Modal */}
            <div className="review-modal">
                {currentUser && spot.Owner.id !== currentUser.id && !hasReviewed && (
                    <button className="reviewmodal-btn" onClick={() => setIsModalOpen(true)}>Post Your Review</button>
                )}
                <ReviewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleReviewSubmit}
                />
            </div>

            {/* Reviews List */}
            <div className="reviews">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="review">
                            <p><strong>{review.User.firstName}</strong></p>
                            <p>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
                            <p>{review.review}</p>
                            {currentUser && review.User.id === currentUser.id && ( // Check if current user is the review's author
                                <div>
                                    <button className="reviews-delete" onClick={() => handleDeleteReview(review.id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="first">Be the first to post a review!</p>
                )}
            </div>

            {/* Delete Review Confirmation Modal */}
            {reviewToDelete && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Confirm Delete</h2>
                        <p>Are you sure you want to delete this review?</p>
                        <div className="modal-buttons">
                            <button className="delete-button" onClick={confirmDeleteReview}>
                                Yes (Delete Review)
                            </button>
                            <button className="cancel-button" onClick={cancelDeleteReview}>
                                No (Keep Review)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default SpotDetails;
