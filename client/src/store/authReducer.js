import { registerUser } from "../api/authApi";

const START = "authApi/START";
const SUCCESS = "authApi/SUCCESS";
const ERROR = "authApi/ERROR";

const initialState = {
  isSuccess: false,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export const registerStart = () => {
  return { type: START };
};

export const registerSuccess = () => {
  return { type: SUCCESS };
};

export const registerError = (error) => {
  return { type: ERROR, payload: error };
};

//////////////////////////////////////////

// зареєструати користувача
export const register = (userData) => async (dispatch) => {
  dispatch(registerStart());
  let res = await registerUser(userData);
  if (!res.error) {
    dispatch(registerSuccess());
  } else {
    dispatch(registerError(res.error));
  }
};
