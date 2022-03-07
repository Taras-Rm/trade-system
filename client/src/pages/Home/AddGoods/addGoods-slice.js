export const ADD_GOODS_START = 'addGoods/START';
export const ADD_GOODS_SUCCESS = 'addGoods/SUCCESS';
export const ADD_GOODS_ERROR = 'addGoods/ERROR';

const STATE = {
  loading: false,
  error: null,
};

function addGoodsReducer(state = STATE, action) {
  switch (action.type) {
    case ADD_GOODS_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ADD_GOODS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ADD_GOODS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export const addGoodsStart = (good) => ({type: ADD_GOODS_START, payload: good});

export const addGoodsSuccess = () => ({type: ADD_GOODS_SUCCESS})

export const addGoodsError = (err) => ({type: ADD_GOODS_ERROR, payload: err})

export default addGoodsReducer;
