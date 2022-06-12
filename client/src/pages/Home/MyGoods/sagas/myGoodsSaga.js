import { put, takeLatest, call } from 'redux-saga/effects';
import { deleteGoodsForSellApi, getAllBuyedGoodsApi, getAllGoodsForSellApi, updateGoodsForSellApi } from '../../../../api/goodsApi';
import { deleteGoodsForSellError, deleteGoodsForSellSuccess, DELETE_GOODS_FOR_SELL_START, getBuyedGoodsError, getBuyedGoodsSuccess, getGoodsForSellError, getGoodsForSellStart, getGoodsForSellSuccess, GET_BUYED_GOODS_START, GET_GOODS_FOR_SELL_START, updateGoodsForSellError, updateGoodsForSellSuccess, UPDATE_GOODS_FOR_SELL_START } from '../myGoods-slice';

export default function* watcherMyGoodsSaga() {
  yield takeLatest(GET_BUYED_GOODS_START, getBuyedGoods);
  yield takeLatest(GET_GOODS_FOR_SELL_START, getGoodsForSell);
  yield takeLatest(DELETE_GOODS_FOR_SELL_START, deleteGoodsForSell)
  yield takeLatest(UPDATE_GOODS_FOR_SELL_START, updateGoodsForSell)
}

function* getBuyedGoods() {
  try {
    let payload = yield call(getAllBuyedGoodsApi);
    
    yield put(getBuyedGoodsSuccess(payload.data.goods))

  } catch (error) {
    yield put(getBuyedGoodsError(error.message))
  }
}

function* getGoodsForSell() {
  try {
    let payload = yield call(getAllGoodsForSellApi);

    yield put(getGoodsForSellSuccess(payload.data.goods))

  } catch (error) {
    yield put(getGoodsForSellError(error.message))
  }
}

function* deleteGoodsForSell(action) {
  try {
    yield call(deleteGoodsForSellApi, action.payload);
  
    yield put(deleteGoodsForSellSuccess())

    // get all new goods for sell
    yield put(getGoodsForSellStart())

  } catch (error) {
    yield put(deleteGoodsForSellError(error.message))
  }
}


function* updateGoodsForSell(action) {
  try {
    yield call(updateGoodsForSellApi, action.payload);
  
    yield put(updateGoodsForSellSuccess())
    // get all new goods for sell
    yield put(getGoodsForSellStart())

  } catch (error) {
    yield put(updateGoodsForSellError(error.message))
  }
}