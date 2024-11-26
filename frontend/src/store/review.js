import { csrfFetch } from './csrf';
import { showSpotDetails } from './spots'


const POST_REVIEW = 'reviews/postReview';
const DELETE_REVIEW = 'reviews/deleteReview';
const All_SPOT_REVIEWS = 'reviews/allSpotReviews';


export function postReview(review) {
    return {
        type: POST_REVIEW,
        review
    }
}

export function deleteReview(reviewId) {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export function spotReviews(reviews) {
    return {
        type: All_SPOT_REVIEWS,
        reviews
    }
}


export const allSpotReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if(res.ok) {
        const data = await res.json();
        dispatch(spotReviews(data.Reviews));
        return data;
    } else {
        return res;
    }
}


export const newReview = (spotId, review) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(showSpotDetails(spotId));
        dispatch(allSpotReviews(spotId));
        return data
    }
    return res;
}


export const destroyReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if(res.ok) {
        const data = await res.json();
        dispatch(deleteReview(reviewId));
        return data
    } else {
        return res;
    }
}

let initialState = {
    spot: {},
}


const reviewReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case All_SPOT_REVIEWS: {
            newState = { spot:{} };
            const reviews = action.reviews;
            reviews.map(review => newState.spot[review.id] = review)
            return newState
        }

        case DELETE_REVIEW: {
            newState = { ...state, spot: { ...state.spot }}
            delete newState.spot[action.reviewId]
            return newState
        }
        default:
        return state
    }
}


export default reviewReducer;
