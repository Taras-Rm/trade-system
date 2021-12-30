import { getGoods } from "../api/homeApi";

const START = "goodsApi/START";
const SUCCESS = "goodsApi/SUCCESS";
const ERROR = "goodsApi/ERROR";
const REMOVE = "goodsApi/REMOVE";

const initialState = {
  isSuccess: false, // false
  isLoading: false,
  error: null,
  goods: [],
};

export const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SUCCESS: {
      return {
        ...state,
        goods: action.payload,
        isLoading: false,
        isSuccess: true,
        error: null,
      };
    }
    case ERROR: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
        isSuccess: false,
      };
    }
    case REMOVE: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export const getGoodsStart = () => {
  return { type: START };
};

export const getGoodsSuccess = (payload) => {
  return { type: SUCCESS, payload };
};

export const getGoodsError = (error) => {
  return { type: ERROR, payload: error };
};

//////////////////////////////////////////

// отримати дані про користувача
export const getAllGoods = (userId) => async (dispatch) => {
  dispatch(getGoodsStart());
  let res = await getGoods(userId);
  if (!res.error) {
    dispatch(getGoodsSuccess(res.goods));
  } else {
    dispatch(getGoodsError(res.error));
  }
};
