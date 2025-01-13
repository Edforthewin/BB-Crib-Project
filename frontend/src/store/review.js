import { csrfFetch} from './csrf';



export const POST_REVIEW = 'reviews/postReview';
export const DELETE_REVIEW = 'reviews/deleteReview';
export const All_SPOT_REVIEWS = 'reviews/allSpotReviews';


const postReview = ( spotId, review) => ({
    type: POST_REVIEW,
        review,
        spotId
});

const deleteReview = (reviewId, spotId) => ({
    type: DELETE_REVIEW,
    reviewId,
    spotId
});

const spotReviews = (spotId, reviews) => ({
    type: All_SPOT_REVIEWS,
        reviews
})


export const allSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if(res.ok) {
        const reviews = await res.json();
        dispatch(spotReviews(reviews));
    } else {
        console.error("Failed to load reviews", res)
    }
}


export const newReview = (spotId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review)
    });

    if(res.ok) {
        const newReview = await res.json();
        dispatch(postReview(spotId, newReview));
        return newReview;
    } else {
        console.error("Failed to submit review:", res)
    }
}


export const destroyReview = (reviewId, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if(res.ok) {
        const data = await res.json();
        dispatch(deleteReview(spotId, reviewId));
        return { ok: true, data };
    } else {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete review');
    }
};

let initialState = {};


const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case All_SPOT_REVIEWS:
            return {...state, [action.reviews.spotId]: action.reviews};


        case POST_REVIEW:
            return {
                ...state,
                [action.spotId]: [...(state[action.spotId] || []), action.review],
            }

        case DELETE_REVIEW: {
           const newReviews = state[action.spotId]?.filter(review => review.id !== action.reviewId) || [];
           return {
                ...state,
                [action.spotId]: newReviews,
           };
        }
        default:
        return state
    }
};


export default reviewsReducer;
