import { loginUser, logoutUser } from "../api/loginApi";
import { removeUser } from "./homeReducer";

const LOGIN_START = "loginApi/START";
const LOGIN_SUCCESS = "loginApi/SUCCESS";
const LOGIN_ERROR = "loginApi/ERROR";
const LOGOUT_START = "logoutApi/START";
const LOGOUT_SUCCESS = "logoutApi/SUCCESS";
const LOGOUT_ERROR = "logoutApi/ERROR";

const initialState = {
  isLoadingLogin: false,
  errorLogin: null,
  isAuthLogin: false, //false
  isLoadingLogout: false,
  errorLogout: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        isLoadingLogin: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoadingLogin: false,
        isAuthLogin: true,
        errorLogin: null,
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        errorLogin: action.payload,
        isLoadingLogin: false,
        isAuthLogin: false,
      };
    }
    case LOGOUT_START: {
      return {
        ...state,
        isLoadingLogout: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLoadingLogout: false,
        isAuthLogin: false,
        errorLogout: null,
      };
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        errorLogout: action.payload,
        isLoadingLogout: false,
        isAuthLogin: false,
      };
    }
    default:
      return state;
  }
};

export const loginStart = () => {
  return { type: LOGIN_START };
};

export const loginSuccess = () => {
  return { type: LOGIN_SUCCESS };
};

export const loginError = (error) => {
  return { type: LOGIN_ERROR, payload: error };
};

export const logoutStart = () => {
  return { type: LOGOUT_START };
};

export const logoutSuccess = () => {
  return { type: LOGOUT_SUCCESS };
};

export const logoutError = (error) => {
  return { type: LOGOUT_ERROR, payload: error };
};
//////////////////////////////////////////

// залогінити користувача
export const login = (userData) => async (dispatch) => {
  dispatch(loginStart());
  let res = await loginUser(userData);

  if (!res.error) {
    dispatch(loginSuccess());
  } else {
    dispatch(loginError(res.error));
  }
};

// розлогінити користувача
export const logout = () => async (dispatch) => {
  dispatch(logoutStart());
  let res = await logoutUser();

  if (!res.error) {
    dispatch(removeUser());
    dispatch(logoutSuccess());
  } else {
    dispatch(logoutError(res.error));
  }
};
