export const GET_BUYED_GOODS_START = 'myGoods/buyed/START';
export const GET_BUYED_GOODS_SUCCESS = 'myGoods/buyed/SUCCESS';
export const GET_BUYED_GOODS_ERROR = 'myGoods/buyed/ERROR';

export const GET_GOODS_FOR_SELL_START = 'myGoods/sell/START';
export const GET_GOODS_FOR_SELL_SUCCESS = 'myGoods/sell/SUCCESS';
export const GET_GOODS_FOR_SELL_ERROR = 'myGoods/sell/ERROR';

export const DELETE_GOODS_FOR_SELL_START = 'myGoods/sell/delete/START';
export const DELETE_GOODS_FOR_SELL_SUCCESS = 'myGoods/sell/delete/SUCCESS';
export const DELETE_GOODS_FOR_SELL_ERROR = 'myGoods/sell/delete/ERROR';

export const UPDATE_GOODS_FOR_SELL_START = 'myGoods/sell/update/START';
export const UPDATE_GOODS_FOR_SELL_SUCCESS = 'myGoods/sell/update/SUCCESS';
export const UPDATE_GOODS_FOR_SELL_ERROR = 'myGoods/sell/update/ERROR';

const STATE = {
  loadingBuyed: false,
  errorBuyed: null,
  buyedGoods: [],
  priceBuyed: null,

  loadingSell: false,
  errorSell: null,
  forSellGoods: [],
  priceSell: null,

  loadingDeleteSell: false,
  errorDeleteSell: null,

  loadingUpdateSell: false,
  errorUpdateSell: null,
};

function myGoodsReducer(state = STATE, action) {
  switch (action.type) {
    case GET_BUYED_GOODS_START:
      return {
        ...state,
        loadingBuyed: true,
        errorBuyed: null
      };

    case GET_BUYED_GOODS_SUCCESS:
      let price1 = 0;
      for(let i = 0; i < action.payload.length; i++) {
        price1 += action.payload[i].price
      }
      return {
        ...state,
        loadingBuyed: false,
        buyedGoods: action.payload,
        errorBuyed: null,
        priceBuyed: price1
      };

    case GET_BUYED_GOODS_ERROR:
      return {
        ...state,
        loadingBuyed: false,
        errorBuyed: action.payload,
      };
    case GET_GOODS_FOR_SELL_START:
      return {
        ...state,
        loadingSell: true,
        errorSell: null
      };

    case GET_GOODS_FOR_SELL_SUCCESS:
      let price2 = 0;
      for(let i = 0; i < action.payload.length; i++) {
        price2 += action.payload[i].price
      }
      return {
        ...state,
        forSellGoods: action.payload,
        loadingSell: false,
        errorSell: null,
        priceSell: price2
      };

    case GET_GOODS_FOR_SELL_ERROR:
      return {
        ...state,
        loadingSell: false,
        errorSell: action.payload,
      };

    case DELETE_GOODS_FOR_SELL_START:
      return {
        ...state,
        loadingDeleteSell: true,
        errorDeleteSell: null
      };

    case DELETE_GOODS_FOR_SELL_SUCCESS:
      return {
        ...state,
        loadingDeleteSell: false,
        errorDeleteSell: null
      };

      case DELETE_GOODS_FOR_SELL_SUCCESS:
        return {
          ...state,
          loadingDeleteSell: false,
          errorDeleteSell: action.payload
      };
    
      case UPDATE_GOODS_FOR_SELL_START:
        return {
          ...state,
          loadingUpdateSell: true,
          errorUpdateSell: null
        };
  
      case UPDATE_GOODS_FOR_SELL_SUCCESS:
        return {
          ...state,
          loadingUpdateSell: false,
          errorUpdateSell: null
        };
  
        case UPDATE_GOODS_FOR_SELL_SUCCESS:
          return {
            ...state,
            loadingUpdateSell: false,
            errorUpdateSell: action.payload
        };

    default:
      return state;
  }
}

export const getBuyedGoodsStart = () => ({type: GET_BUYED_GOODS_START});

export const getBuyedGoodsSuccess = (goods) => ({type: GET_BUYED_GOODS_SUCCESS, payload: goods})

export const getBuyedGoodsError = (err) => ({type: GET_BUYED_GOODS_ERROR, payload: err})


export const getGoodsForSellStart = () => ({type: GET_GOODS_FOR_SELL_START});

export const getGoodsForSellSuccess = (goods) => ({type: GET_GOODS_FOR_SELL_SUCCESS, payload: goods})

export const getGoodsForSellError = (err) => ({type: GET_GOODS_FOR_SELL_ERROR, payload: err})


export const deleteGoodsForSellStart = (goodId) => ({type: DELETE_GOODS_FOR_SELL_START, payload: goodId});

export const deleteGoodsForSellSuccess = () => ({type: DELETE_GOODS_FOR_SELL_SUCCESS})

export const deleteGoodsForSellError = (err) => ({type: DELETE_GOODS_FOR_SELL_ERROR, payload: err})


export const updateGoodsForSellStart = (good) => ({type: UPDATE_GOODS_FOR_SELL_START, payload: good});

export const updateGoodsForSellSuccess = () => ({type: UPDATE_GOODS_FOR_SELL_SUCCESS})

export const updateGoodsForSellError = (err) => ({type: UPDATE_GOODS_FOR_SELL_ERROR, payload: err})


export default myGoodsReducer;
