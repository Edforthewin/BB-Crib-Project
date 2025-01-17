import { csrfFetch } from "./csrf";

export const LOAD_SPOTS ='spots/loadSpots';
export const NEW_SPOT = 'spots/newSpot';
export const DELETE_SPOT = 'spots/deleteSpot';
export const EDIT_SPOT = 'spots/editSpot';
export const ADD_SPOT_IMAGE = 'spots/addSpotImage'



const showSpots = (spots) => ({
        type: LOAD_SPOTS,
        spots: spots.Spots
})

const newSpot = (spot) => ({
        type: NEW_SPOT,
        spot
});

const editSpot = (spot) => ({
    type: EDIT_SPOT,
    spot
});

const addSpotImage = (image, spotId) => ({
    type: ADD_SPOT_IMAGE,
    image: {
        ...image,
        spotId,
    }
});

const deleteSpot = (spotId) => ({
        type: DELETE_SPOT,
        spotId
});

const isLoggedIn = (state) => {
    return state.session.user !== null;
};



export const allSpots = () => async (dispatch) => {
    const res = await fetch('api/spots');
    if(res.ok) {
        const spots = await res.json();
        dispatch(showSpots(spots));
    }
};


export const makeSpot = (data) => async (dispatch, getState) => {
    const state = getState();
    if(!isLoggedIn(state)) {
        alert("You must be logged in to add a spot.");
        return;
    }

    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
        const spot = await res.json();
        dispatch(newSpot(spot));

        if(data.imageUrls && data.imageUrls.length > 0) {
            await dispatch(uploadSpotImage(spot.id, data.imageUrls));
        }
        return spot;
    }
    else {
        const errorData = await res.json();
        console.error('Error creating spot:', errorData);
        throw new Error("Failed to create spot");
    }
};


export const modifySpot = (spotId, data) => async (dispatch, getState) => {
    const state = getState();
    if(!isLoggedIn(state)) {
        alert("You must be logged in to update a spot.");
        return;
    }

    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if(res.ok) {
        const spot = await res.json();
        dispatch(editSpot(spot));
        return spot;
    }
};


export const uploadSpotImage = (spotId, imageUrls, previewImage) => async (dispatch) => {
    if(previewImage) {
        try {
            const res = await csrfFetch(`/api/spots/${spotId}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: previewImage, preview: true }),
            });

            const newPreviewImage = await res.json();
            dispatch(addSpotImage(newPreviewImage, spotId));
        } catch(error) {
            throw new Error(error.message || "Failed to upload previe image");
        }
    }

    const promises = imageUrls.map ((url) =>
        csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url, preview: false }),
        })
    );

    try {
        const responses = await Promise.all(promises);
        const newImages = await Promise.all(responses.map(res => res.json()));
        newImages.forEach(newImage => {
            dispatch(addSpotImage(newImage, spotId));
        });
    } catch (error) {
        throw new Error(error.message || 'Failed to upload additional images');
    }
};

export const destroySpot = (spotId) => async (dispatch, getState) => {
    const state = getState();
    if(!isLoggedIn(state)) {
        alert("You must be logged in to remove a spot.");
        return;
    }

    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if(res.ok) {
        dispatch(deleteSpot(spotId));
    }
};


const initialState = {};

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_SPOTS: {
            const newSpots = {};
            action.spots.forEach(spot => {
                newSpots[spot.id] = {
                    ...spot,
                };
            });
            return {
                ...state,
                ...newSpots
            };
        }

        case NEW_SPOT:
        case EDIT_SPOT: {
            return {
                 ...state,
                [action.spot.id]: {
                    ...action.spot,
                    spotImages: action.spot.spotImages || [],
                }
            };
        }

        case DELETE_SPOT: {
            const newState = {...state };
            delete newState[action.spotId];
            return newState;
        }

        case ADD_SPOT_IMAGE: {
            const spotId = action.image.spotId;
            return {
                ...state,
                [spotId]: {
                    ...state[spotId],
                    spotImages: [...(state[spotId]?.spotImages || []), action.image],
                },
            };
        }


        default:
            return state;
    }
};

export default spotsReducer;
