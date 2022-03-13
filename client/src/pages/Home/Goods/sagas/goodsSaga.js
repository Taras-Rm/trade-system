import { call, put, takeLatest } from "redux-saga/effects";
import { buyGoodApi, getAllGoodsApi } from "../../../../api/goodsApi";
import { buyGoodError, buyGoodSuccess, BUY_GOOD_START, getAllGoodsError, getAllGoodsStart, getAllGoodsSuccess, GET_ALL_GOODS_START } from "../goods-slice";

export default function* watcherAllGoodsSaga() {
  yield takeLatest(GET_ALL_GOODS_START, getAllGoodsData);
  yield takeLatest(BUY_GOOD_START, buyGood);
}

function* getAllGoodsData() {
  try {
    let payload = yield call(getAllGoodsApi);
    
    yield put(getAllGoodsSuccess(payload.data.goods))

  } catch (error) {
    yield put(getAllGoodsError(error.message))
  }
}

function* buyGood(action) {
  debugger
  try {
    let payload = yield call(buyGoodApi, action.payload);
    
    yield put(buyGoodSuccess())
    yield put(getAllGoodsStart())

  } catch (error) {
    yield put(buyGoodError(error.message))
  }
}