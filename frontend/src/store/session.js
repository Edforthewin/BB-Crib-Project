import { csrfFetch } from './csrf';

const LOGIN = "session/login";
const LOGOUT = "session/logout";

export function login(user) {
  return {
    type: LOGIN,
    payload: user
  }
}

export function logout(user) {
  return {
    type: LOGOUT,
    user
  };
}

export const userLogin = (user) => async (dispatch) => {
  const res = await csrfFetch(`/api/session`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
});
const data = await res.json();
dispatch(login(data.user));
return res;
};

export const restoreUser = () => async (dispatch) => {
  const res = await csrfFetch('/api/session');
  const data = await res.json();
  dispatch(login(data.user));
  return res;
  };

  export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, password, username, email } = user;
    const res = await csrfFetch(`/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, password, username, email})
    });
    const data = await res.json();
    dispatch(login(data.user));
    return res;
  };

  export const userLogout = () => async (dispatch) => {
    const res = await csrfFetch(`/api/session`, {
      method: 'DELETE',
  });
  dispatch(logout());
  return res;
  };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
