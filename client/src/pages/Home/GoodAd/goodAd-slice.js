export const GET_USER_DATA_START = 'getUserData/START';
export const GET_USER_DATA_SUCCESS = 'getUserData/SUCCESS';
export const GET_USER_DATA_ERROR = 'getUserData/ERROR';

const STATE = {
  user: {},
  loading: false,
  error: null,
};

function getUserReducer(state = STATE, action) {
  switch (action.type) {
      case GET_USER_DATA_START:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case GET_USER_DATA_SUCCESS:
        return {
          ...state,
          user: action.payload,
          loading: false,
          error: null,
        };
  
      case GET_USER_DATA_ERROR:
        return {
          ...state,
          error: action.payload,
          loading: false
        };
    default:
      return state;
  }
}

export const getUserDataStart = (userId) => ({type: GET_USER_DATA_START, payload: userId});

export const getUserDataSuccess = (user) => ({type: GET_USER_DATA_SUCCESS, payload: user})

export const getUserDataError = (err) => ({type: GET_USER_DATA_ERROR, payload: err})


export default getUserReducer;
