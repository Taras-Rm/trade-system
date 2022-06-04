export const GET_CHARTS_DATA_START = "profile/GET_CHARTS_DATA_START";
export const GET_CHARTS_DATA_SUCCESS = "profile/GET_CHARTS_DATA_SUCCESS";
export const GET_CHARTS_DATA_ERROR = "profile/GET_CHARTS_DATA_ERROR";

const STATE = {
  loading: false,
  error: null,
  monthData: [],
};

function chartsReducer(state = STATE, action) {
  switch (action.type) {
    case GET_CHARTS_DATA_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CHARTS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        monthData: action.payload,
      };

    case GET_CHARTS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const getChartsDataStart = () => ({ type: GET_CHARTS_DATA_START });

export const getChartsDataSuccess = (data) => ({
  type: GET_CHARTS_DATA_SUCCESS,
  payload: data,
});

export const getChartsDataError = (err) => ({
  type: GET_CHARTS_DATA_ERROR,
  payload: err,
});

export default chartsReducer;
