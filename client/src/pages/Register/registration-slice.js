// Actions
export const START = 'registration/START';
export const SUCCESS = 'registration/SUCCESS';
export const ERROR = 'registration/ERROR';

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

    default:
      return state;
  }
};

export const getRegistrationStart = (formData) => ({ type: START, payload: formData });
export const getRegistrationSuccess = () => ({ type: SUCCESS });
export const getRegistrationError = (err) => ({ type: ERROR, payload: err });

export default registrationReducer;
