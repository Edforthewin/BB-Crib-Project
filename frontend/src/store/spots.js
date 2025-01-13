import { csrfFetch } from "./csrf";

export const LOAD_All_SPOTS ='spots/loadAllSpots';
export const NEW_SPOT = 'spots/newSpot';
export const DELETE_SPOT = 'spots/deleteSpot';
export const EDIT_SPOT = 'spots/editSpots';
export const ADD_SPOT_IMAGE = 'spots/addSpotImage'



const showSpots = (spots) => ({
        type: LOAD_All_SPOTS,
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
}



export const allSpots = () => async (dispatch) => {
    const res = await fetch('api/spots');
    if(res.ok) {
        const spots = await res.json();
        dispatch(LOAD_All_SPOTS(spots));
    }
};


export const makeSpot = (spot) => async (dispatch) => {
    const { name, description, address, city, country, state, lat, lng, price, url, preview } = spot;
    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, address, city, country, state, lat, lng, price })
    });
    if(res.ok) {
        const data  = await res.json();
        const fetchImg = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url, preview })
        });
        if(fetchImg.ok) {
            const imgInfo = await fetchImg.json();
            const imgUrl = imgInfo.url;
            data.previewImage = imgUrl;
            dispatch(newSpot(data));
            return data;
        }
    }
}


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

export const destroySpot = (spot) => async (dispatch) => {
    const spotId = spot.id;
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });
    if(res.ok) {
        const data = await res.json();
        dispatch(deleteSpot(spotId))
        return data;
    } else {
        return res;
    }
}

export const spotFilter = (query) => async (dispatch) => {
    const { minPrice, maxPrice } = query;
        const res = await fetch(`/api/spots/?minPrice=${minPrice}&maxPrice=${maxPrice}`);
        const data = await res.json();
        dispatch(filterSpots(data));
        return data;
}

export const fetchOneSpot = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);
    const data = await response.json();
    dispatch(displayDetailedSpot(data));
}

let initialState = {
    allSpots: {},
    oneSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_All_SPOTS: {
            newState = { allSpots: {}, oneSpot: {}};

            for(let spot of action.spots) {
                newState.allSpots[spot.id] = spot
            }
            return newState;
        }

        case NEW_SPOT: {
            newState = { ...state };
            const spot = action.spot;
            newState.allSpots[spot.id] = spot;
            return newState;
        }

        case DELETE_SPOT: {
            newState = { ...state };
            delete newState.allSpots[action.spotId];
            return newState;
        }

        case DETAIL_SPOT: {
            newState = { ...state};
            const spot = action.spot;
            newState.oneSpot = spot;
            return newState;
        }
        case USER_SPOT: {
            newState = {allSpots: {}, oneSpot: {}};
            for(let spot of action.spots) {
                newState.allSpots[spot.id] = spot
            }
            return newState;
        }
        case EDIT_SPOT: {
            newState = { ...state };
            const spot = action.spot;
            newState.allSpots[spot.id] = spot;
            return newState;
        }
        case FILTER_SPOTS: {
            newState = {allSpots: {}, oneSpot: {}};
            const filteredSpot = action.spots.Spots;
            for(let spot of filteredSpot) {
                newState.allSpots[spot.id] = spot
            }
            return newState;
        }
        default:
            return state
    }
}

export default spotsReducer
