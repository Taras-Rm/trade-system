export const LOAD_DATA_START = 'profile/START';
export const LOAD_DATA_SUCCESS = 'profile/SUCCESS';
export const LOAD_DATA_ERROR = 'profile/ERROR';

export const LOGOUT = 'profile/LOGOUT';

export const START_UPDATE = 'profile/START_UPDATE';
export const SUCCESS_UPDATE = 'profile/SUCCESS_UPDATE';
export const ERROR_UPDATE = 'profile/ERROR_UPDATE';

const STATE = {
  loading: null,
  auth: false,
  user: null,
  error: null,
  isUpdated: false,
};

function profileReducer(state = STATE, action) {
  switch (action.type) {
    case LOAD_DATA_START:
      return {
        ...state,
        loading: true,
      };

    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        auth: true,
        user: action.payload,
        loading: false,
        error: null,
      };

    case LOAD_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
        auth: false
      };

    case LOGOUT:
      return {
        ...state,
        auth: false,
        user: null
      }
    case START_UPDATE:
      return {
        ...state,
        loading: true,
        isUpdated: false,
      };

    case SUCCESS_UPDATE:
      return {
        ...state,
        user: action.payload,
        auth: true,
        loading: false,
        error: null,
        isUpdated: true,
      };

    case ERROR_UPDATE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        auth: true,
        isUpdated: true,
      };
    default:
      return state;
  }
}

export const getProfileStart = () => ({type: LOAD_DATA_START});

export const getProfileSuccess = (user) => ({type: LOAD_DATA_SUCCESS, payload: user})

export const getProfileError = (err) => ({type: LOAD_DATA_ERROR, payload: err})

export const logoutUser = () => ({ type: LOGOUT })

export const updateProfileStart = (user) => ({type: START_UPDATE, payload: user})

export const updateProfileSuccess = (user) => ({type: SUCCESS_UPDATE, payload: user})

export const updateProfileError = (err) => ({type: ERROR_UPDATE, payload: err})

export default profileReducer;
