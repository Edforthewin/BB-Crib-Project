import { csrfFetch } from "./csrf";

const LOAD_All_SPOTS ='spots/loadAllSpots';
const NEW_SPOT = 'spots/newSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const DETAIL_SPOT = 'spots/detailSpot';
const USER_SPOT = 'spots/userSpots';
const EDIT_SPOT = 'spots/editSpots';
const FILTER_SPOTS = 'spots/filterSpots';
const LOAD_DETAIL_SPOT = 'spots/loadDetailSpot';



export function showSpots(spots) {
    return {
        type: LOAD_All_SPOTS,
        spots
    }
}

export function newSpot(spot) {
    return {
        type: NEW_SPOT,
        spot
    }
}

export function deleteSpot(spotId) {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

export function displayDetailedSpot(spot) {
    return {
        type: LOAD_DETAIL_SPOT,
        spot
    }
}

export function editSpot(spot) {
    return {
        type: EDIT_SPOT,
        spot
    }
}

export function spotDetails(spot) {
    return {
        type: DETAIL_SPOT,
        spot
    }
}

export function userSpots(spots) {
    return {
        type: USER_SPOT,
        spots
    }
}

export function filterSpots(spots) {
    return {
        type: FILTER_SPOTS,
        spots
    }
}




export const allSpots = () => async (dispatch) => {
    const res = await fetch('api/spots');
    const spotsInfo = await res.json();
    dispatch(showSpots(spotsInfo.Spots));
    return res;
};


export const makeSpot = spot => async (dispatch) => {
    const { name, description, address, city, country, state, lat, lng, price, url, preview } = spot;
    const res = await csrfFetch('/api/spots', {
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


export const showSpotDetails = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);
    const data = await res.json();
    dispatch(spotDetails(data));
}

export const allUserSpots = () => async (dispatch) => {
    const res = await fetch(`/api/spots/current`);
    const data = await res.json();
    dispatch(userSpots(data.Spots));
}

export const modifySpot = (spot) => async (dispatch) => {
    const { name, description, address, city, country, state, lat, lng, price } = spot;
    const res = await csrfFetch(`'/api/spots/${spot.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, address, city, country, state, lat, lng, price })
    })
    if(res.ok) {
        const data = await res.json();
        dispatch(editSpot(data));
        return data;
    }
}

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

const spotReducer = (state = initialState, action) => {
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

export default spotReducer
