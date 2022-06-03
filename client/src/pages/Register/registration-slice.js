// Actions
export const START = 'registration/START';
export const SUCCESS = 'registration/SUCCESS';
export const ERROR = 'registration/ERROR';

export const STOP_HAVE_ERROR = 'registration/STOP_HAVE_ERROR';


const initialState = {
  isLoad: false,
  error: null,

  isSuccess: false,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case START:
      return {
        ...state,
        isLoad: true,
        error: null
      };
    case SUCCESS:
      return {
        ...state,
        isSuccess: true,
        isLoad: false,
        error: null
      };
    case ERROR:
      return {
        ...state,

        isLoad: false,
        error: action.payload
      };
    case STOP_HAVE_ERROR:
      return {
        ...state,
        error: null,
        isSuccess: false
      }

    default:
      return state;
  }
};

export const getRegistrationStart = (formData) => ({ type: START, payload: formData });
export const getRegistrationSuccess = () => ({ type: SUCCESS });
export const getRegistrationError = (err) => ({ type: ERROR, payload: err });

export const stopHaveErrorAndSuccess = () => ({ type: STOP_HAVE_ERROR });


export default registrationReducer;
