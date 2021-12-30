import { getUser } from "../api/homeApi";

const START = "homeApi/START";
const SUCCESS = "homeApi/SUCCESS";
const ERROR = "homeApi/ERROR";
const REMOVE = "homeApi/REMOVE";

const initialState = {
  isSuccess: false, // false
  isLoading: false,
  error: null,
  user: null,
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isSuccess: true,
        error: null,
      };
    }
    case ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSuccess: false,
      };
    }
    case REMOVE: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export const getUserStart = () => {
  return { type: START };
};

export const getUserSuccess = (payload) => {
  return { type: SUCCESS, payload };
};

export const getUserError = (error) => {
  return { type: ERROR, payload: error };
};

export const removeUser = () => {
  return { type: REMOVE };
};

//////////////////////////////////////////

// отримати дані про користувача
export const getUserProfile = () => async (dispatch) => {
  dispatch(getUserStart());
  let res = await getUser();
  if (!res.error) {
    dispatch(getUserSuccess(res.user));
  } else {
    dispatch(getUserError(res.error));
  }
};
