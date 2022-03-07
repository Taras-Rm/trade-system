export const GET_ALL_GOODS_START = 'getAllGoods/START';
export const GET_ALL_GOODS_SUCCESS = 'getAllGoods/SUCCESS';
export const GET_ALL_GOODS_ERROR = 'getAllGoods/ERROR';

const STATE = {
  loading: false,
  goods: [],
  error: null,
};

function goodsReducer(state = STATE, action) {
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
        goods: action.payload,
        loading: false,
        error: null,
      };

    case GET_ALL_GOODS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export const getAllGoodsStart = () => ({type: GET_ALL_GOODS_START});

export const getAllGoodsSuccess = (goods) => ({type: GET_ALL_GOODS_SUCCESS, payload: goods})

export const getAllGoodsError = (err) => ({type: GET_ALL_GOODS_ERROR, payload: err})

export default goodsReducer;
