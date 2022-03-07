export const GET_BUYED_GOODS_START = 'myGoods/buyed/START';
export const GET_BUYED_GOODS_SUCCESS = 'myGoods/buyed/SUCCESS';
export const GET_BUYED_GOODS_ERROR = 'myGoods/buyed/ERROR';

export const GET_GOODS_FOR_SELL_START = 'myGoods/sell/START';
export const GET_GOODS_FOR_SELL_SUCCESS = 'myGoods/sell/SUCCESS';
export const GET_GOODS_FOR_SELL_ERROR = 'myGoods/sell/ERROR';

const STATE = {
  loadingBuyed: false,
  errorBuyed: null,
  buyedGoods: [],
  priceBuyed: null,

  loadingSell: false,
  errorSell: null,
  forSellGoods: [],
  priceSell: null,
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


export default myGoodsReducer;
