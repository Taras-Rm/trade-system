export const SEND_DATA_START = 'addGoods/START';
export const SEND_DATA_SUCCESS = 'addGoods/SUCCESS';
export const SEND_DATA_ERROR = 'addGoods/ERROR';

const STATE = {
  loading: false,
  error: null,
};

function addGoodsReducer(state = STATE, action) {
  switch (action.type) {
    case SEND_DATA_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case SEND_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case SEND_DATA_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export const addGoodsStart = (good) => ({type: SEND_DATA_START, payload: good});

export const addGoodsSuccess = () => ({type: SEND_DATA_SUCCESS})

export const addGoodsError = (err) => ({type: SEND_DATA_ERROR, payload: err})

export default addGoodsReducer;
