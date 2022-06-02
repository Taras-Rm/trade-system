export const LOAD_DATA_START = 'profile/START';
export const LOAD_DATA_SUCCESS = 'profile/SUCCESS';
export const LOAD_DATA_ERROR = 'profile/ERROR';

export const LOGOUT = 'profile/LOGOUT';

export const START_UPDATE = 'profile/START_UPDATE';
export const SUCCESS_UPDATE = 'profile/SUCCESS_UPDATE';
export const ERROR_UPDATE = 'profile/ERROR_UPDATE';

export const START_GET_BUYED_GOODS = 'profile/START_GET_BUYED_GOODS';
export const SUCCESS_GET_BUYED_GOODS = 'profile/SUCCESS_GET_BUYED_GOODS';
export const ERROR_GET_BUYED_GOODS = 'profile/ERROR_GET_BUYED_GOODS';

export const START_GET_SOLD_GOODS = 'profile/START_GET_SOLD_GOODS';
export const SUCCESS_GET_SOLD_GOODS = 'profile/SUCCESS_GET_SOLD_GOODS';
export const ERROR_GET_SOLD_GOODS = 'profile/ERROR_GET_SOLD_GOODS';

export const START_TOP_UP_AMOUNT = 'profile/START_TOP_UP_AMOUNT';
export const SUCCESS_TOP_UP_AMOUNT = 'profile/SUCCESS_TOP_UP_AMOUNT';
export const ERROR_TOP_UP_AMOUNT = 'profile/ERROR_TOP_UP_AMOUNT';

const STATE = {
  loading: false,
  auth: false,
  user: null,
  error: null,
  isUpdated: false,

  buyedGoods: [],
  buyedGoodsPrice: 0,
  loadingBuyedGoods: false,

  soldGoods : [],
  soldGoodsPrice: 0,
  loadingSoldGoods: false,
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

      case START_GET_BUYED_GOODS:
        return {
          ...state,
          loadingBuyedGoods: true,
        };
  
      case SUCCESS_GET_BUYED_GOODS:
        let price1 = 0;
        for(let i = 0; i < action.payload.length; i++) {
          price1 += action.payload[i].price
        }
        return {
          ...state,
          loadingBuyedGoods: false,
          buyedGoodsPrice: price1,
          error: null,
          buyedGoods: action.payload,
        };
  
      case ERROR_GET_BUYED_GOODS:
        return {
          ...state,
          loadingBuyedGoods: false,
          error: action.payload,
          buyedGoods: []
        };

      case START_GET_SOLD_GOODS:
      return {
        ...state,
        loadingSoldGoods: true,
      };
  
      case SUCCESS_GET_SOLD_GOODS:
        let price2 = 0;
        for(let i = 0; i < action.payload.length; i++) {
          price2 += action.payload[i].price
        }
        return {
          ...state,
          loadingSoldGoods: false,
          soldGoodsPrice: price2,
          error: null,
          soldGoods: action.payload,
        };
  
      case ERROR_GET_SOLD_GOODS:
        return {
          ...state,
          loadingSoldGoods: false,
          error: action.payload,
          soldGoods: []
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


export const getBuyedGoodsStart = () => ({type: START_GET_BUYED_GOODS})

export const getBuyedGoodsSuccess = (goods) => ({type: SUCCESS_GET_BUYED_GOODS, payload: goods})

export const getBuyedGoodsError = (err) => ({type: ERROR_GET_BUYED_GOODS, payload: err})


export const getSoldGoodsStart = () => ({type: START_GET_SOLD_GOODS})

export const getSoldGoodsSuccess = (goods) => ({type: SUCCESS_GET_SOLD_GOODS, payload: goods})

export const getSoldGoodsError = (err) => ({type: ERROR_GET_SOLD_GOODS, payload: err})


export const topUpAmountStart = (data) => ({type: START_TOP_UP_AMOUNT, payload: data})

export const topUpAmountSuccess = () => ({type: SUCCESS_TOP_UP_AMOUNT })

export const topUpAmountError = (err) => ({type: ERROR_TOP_UP_AMOUNT, payload: err})


export default profileReducer;
