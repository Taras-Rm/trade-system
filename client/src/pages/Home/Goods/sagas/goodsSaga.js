import { call, put, takeLatest } from "redux-saga/effects";
import { buyGoodApi, getAllGoodsApi, getGoodApi } from "../../../../api/goodsApi";
import { getUserDataStart } from "../../GoodAd/goodAd-slice";
import { buyGoodError, buyGoodSuccess, BUY_GOOD_START, getAllGoodsError, getAllGoodsStart, getAllGoodsSuccess, getGoodError, getGoodSuccess, GET_ALL_GOODS_START, GET_GOOD_START } from "../goods-slice";

export default function* watcherAllGoodsSaga() {
  yield takeLatest(GET_ALL_GOODS_START, getAllGoodsData);
  yield takeLatest(BUY_GOOD_START, buyGood);
  yield takeLatest(GET_GOOD_START, getGoodData);

}

function* getAllGoodsData() {
  try {
    let payload = yield call(getAllGoodsApi);
    
    yield put(getAllGoodsSuccess(payload.data.goods))

  } catch (error) {
    yield put(getAllGoodsError(error.message))
  }
}

function* getGoodData(action) {
  try {
    let payload = yield call(getGoodApi, action.payload);
    
    yield put(getGoodSuccess(payload.data.good))
    yield put(getUserDataStart(payload.data.good.userID))


  } catch (error) {
    yield put(getGoodError(error.message))
  }
}


function* buyGood(action) {
  try {
    yield call(buyGoodApi, action.payload);
    yield put(buyGoodSuccess())
    yield put(getAllGoodsStart())

  } catch (error) {
    yield put(buyGoodError(error.response.data.error))
  }
}