// Actions
export const START = "login/START";
export const START_BY_TOKENS = "login/START_BY_TOKENS";
export const SUCCESS = "login/SUCCESS";
export const ERROR = "login/ERROR";

export const STOP_HAVE_LOGIN_ERROR = "login/STOP_HAVE_LOGIN_ERROR";

const initialState = {
  isLoad: false,
  error: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        isLoad: true,
        error: null,
      };
    case SUCCESS:
      return {
        ...state,

        isLoad: false,
        error: null,
      };
    case ERROR:
      return {
        ...state,

        isLoad: false,
        error: action.payload,
      };
    case STOP_HAVE_LOGIN_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getLoginStart = (formData) => ({ type: START, payload: formData });

export const getLoginStartByTokens = (formData) => ({
  type: START_BY_TOKENS,
  payload: formData,
});

export const getLoginSuccess = () => ({ type: SUCCESS });

export const getLoginError = (err) => ({ type: ERROR, payload: err });

export const stopHaveLoginError = () => ({ type: STOP_HAVE_LOGIN_ERROR });


export default loginReducer;
