import { csrfFetch } from './csrf';

const LOGIN = "session/login";
const LOGOUT = "session/logout";
const LOGIN_DEMO_USER = "session/loginDemoUser";

const login = (user) => {
  return {
    type: LOGIN,
    payload: user
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

const loginDemorUser = (user) => {
  return {
    type: LOGIN_DEMO_USER,
    payload: user,
  };
};

export const userLogin = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password
    })
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

  export const demoLogin = () => async (dispatch) => {
    const demoCreds = {
      credential: 'Demo-lition',
      password: 'password'
    };

    const res = await csrfFetch("/api/session", {
      method: 'POST',
      body: JSON.stringify(demoCreds),
    });

    if(res.ok) {
      const data = await res.json();
      dispatch(loginDemorUser(data.user));
    } else {
      console.error("Demo login failed")
    }
  };

  export const signup = (user) => async (dispatch) => {
    const { firstName, lastName, password, username, email } = user;
    const res = await csrfFetch("/api/users", {
        method: 'POST',
        body: JSON.stringify({firstName, lastName, password, username, email})
    });
    const data = await res.json();
    dispatch(login(data.user));
    return res;
  };

  export const userLogout = () => async (dispatch) => {
    const res = await csrfFetch("/api/session", {
      method: 'DELETE',
  });
  dispatch(logout());
  return res;
  };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      case LOGIN_DEMO_USER:
        return {...state, user: action.payload};
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
