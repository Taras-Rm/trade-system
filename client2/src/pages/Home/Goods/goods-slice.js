export const GET_ALL_GOODS_START = 'getAllGoods/START';
export const GET_ALL_GOODS_SUCCESS = 'getAllGoods/SUCCESS';
export const GET_ALL_GOODS_ERROR = 'getAllGoods/ERROR';

const STATE = {
goods: [],
  loading: false,
  error: null,
};

function getAllGoodsReducer(state = STATE, action) {
  switch (action.type) {
    case GET_ALL_GOODS_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_ALL_GOODS_SUCCESS:
      return {
        ...state,
        loading: false,
        goods: action.payload,
        error: null,
      };

    case GET_ALL_GOODS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
}

export const getAllGoodsStart = () => ({type: GET_ALL_GOODS_START});

export const getAllGoodsSuccess = (goods) => ({type: GET_ALL_GOODS_SUCCESS, payload: goods})

export const getAllGoodsError = (err) => ({type: GET_ALL_GOODS_ERROR, payload: err})

export default getAllGoodsReducer;
