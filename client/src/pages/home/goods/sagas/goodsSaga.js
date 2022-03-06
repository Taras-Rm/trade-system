import { call, put, takeLatest } from "redux-saga/effects";
import { getAllGoodsApi } from "../../../../api/goodsApi";
import { getAllGoodsError, getAllGoodsSuccess, GET_ALL_GOODS_START } from "../goods-slice";

export default function* watcherAllGoodsSaga() {
  yield takeLatest(GET_ALL_GOODS_START, getAllGoodsData);
}

function* getAllGoodsData() {
  try {
    let payload = yield call(getAllGoodsApi);
    
    yield put(getAllGoodsSuccess(payload.data.goods))

  } catch (error) {
    yield put(getAllGoodsError(error.message))
  }
}