import { csrfFetch } from "./csrf";

const LOAD_All_SPOTS ='spots/loadAllSpots';
const NEW_SPOT = 'spots/newSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const DETAIL_SPOT = 'spots/detailSpot';
const USER_SPOT = 'spots/userSpots';
const EDIT_SPOT = 'spots/editSpots';
const FILTER_SPOTS = 'spots/filterSpots';

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
        body: JSON.stringify({ name, description, address, city, country, state, lat, lng, price})
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
