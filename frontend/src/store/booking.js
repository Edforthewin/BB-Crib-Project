/* eslint-disable no-fallthrough */
import { csrfFetch } from "./csrf";

const LOAD_USERBOOKINGS = 'bookings/loadUserBookings';
const LOAD_SPOTBOOKINGS = 'bookings/loadSpotBookings';
const CREATE_BOOKING = 'bookings/createBooking';
const REMOVE_BOOKING = 'bookings/removeBooking';
const EDIT_BOOKING = 'bookings/editBooking';

export function loadUserBookings(bookings) {
    return {
        type: LOAD_USERBOOKINGS,
        bookings
    }
}

export function loadSpotBookings(bookings) {
    return {
        type: LOAD_SPOTBOOKINGS,
        bookings
    }
}

export function createBooking(booking) {
    return {
        type: CREATE_BOOKING,
        booking
    }
}

export function removeBooking(bookingId) {
    return {
        type: REMOVE_BOOKING,
        bookingId
    }
}

export function editBooking(booking) {
    return {
        type: EDIT_BOOKING,
        booking
    }
}


export const fetchUserBookings =  () => async (dispatch) => {

        const response = await csrfFetch(`/api/bookings/current`);
        const data = await response.json();
        dispatch(loadUserBookings(data));
}

export const fetchSpotBookings = (spotId) => async (dispatch) => {
    const res  = await csrfFetch(`/api/spots/${spotId}/bookings`);
    const data = await res.json();
    dispatch(loadSpotBookings(data))
}

export const makeBooking = (booking) => async (dispatch) => {
    const { startDate, endDate, spotId } = booking;

    const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({startDate, endDate})
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(fetchUserBookings());
        return data
    } else {
        const data = await res.json();
        return data;
    }
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(removeBooking(bookingId));
        return data;
    } else {
        const data = await res.json();
        return data;
    }
}


let initialState = {
    user: {}, spot: {}
}


function bookingsReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_USERBOOKINGS: {
            newState = deepCopy(state)
            const bookings = action.bookings.Bookings;
            for (let booking of bookings) {
                newState.user[booking.id] = booking
            }
        }

         case LOAD_SPOTBOOKINGS: {
            newState = deepCopy(state);
            const bookings = action.bookings.Bookings;
            newState.spot = bookings;
            return newState;
        }

        case CREATE_BOOKING: {
            newState = deepCopy(state);
            const booking = action.booking;
            newState.user[booking.id] = booking;
            return newState;
        }

        case REMOVE_BOOKING: {
            newState = deepCopy(state);
            const bookingId = action.bookingId;
            delete newState.user[bookingId];
            return newState;
        }
        default:
            return state;
    }
}

function deepCopy(value) {
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.map(element => deepCopy(element));
        } else {
            const result = {};
            Object.entries(value).forEach(entry => {
                result[entry[0]] = deepCopy(entry[1]);
            });
            return result;
        }
    } else {
        return value;
    }
}

export default bookingsReducer
