export const GET_ALL_GOODS_START = 'getAllGoods/START';
export const GET_ALL_GOODS_SUCCESS = 'getAllGoods/SUCCESS';
export const GET_ALL_GOODS_ERROR = 'getAllGoods/ERROR';

export const BUY_GOOD_START = 'buyGood/START';
export const BUY_GOOD_SUCCESS = 'buyGood/SUCCESS';
export const BUY_GOOD_ERROR = 'buyGood/ERROR';

const STATE = {
  goods: [],
  loading: false,
  error: null,

  loadingBuyGood: false,
  errorBuyGood: null,
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
      let gds = []
      for(let i = 0; i < action.payload.length; i++) {
        if(action.payload[i].customerID == 0) {
          gds.push(action.payload[i])
        }
      } 
      return {
        ...state,
        loading: false,
        goods: gds,
        error: null,
      };

    case GET_ALL_GOODS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

      case BUY_GOOD_START:
        return {
          ...state,
          loadingBuyGood: true,
          errorBuyGood: null
        };
  
      case BUY_GOOD_SUCCESS:
        return {
          ...state,
          loadingBuyGood: false,
          errorBuyGood: null,
        };
  
      case BUY_GOOD_ERROR:
        return {
          ...state,
          errorBuyGood: action.payload,
          loadingBuyGood: false
        };
    default:
      return state;
  }
}

export const getAllGoodsStart = () => ({type: GET_ALL_GOODS_START});

export const getAllGoodsSuccess = (goods) => ({type: GET_ALL_GOODS_SUCCESS, payload: goods})

export const getAllGoodsError = (err) => ({type: GET_ALL_GOODS_ERROR, payload: err})


export const buyGoodsStart = (goodId) => ({type: BUY_GOOD_START, payload: goodId});

export const buyGoodSuccess = () => ({type: BUY_GOOD_SUCCESS})

export const buyGoodError = (err) => ({type: BUY_GOOD_ERROR, payload: err})

export default getAllGoodsReducer;
