import { call, put, takeLatest } from "redux-saga/effects";
import { addGoodsApi } from "../../../../api/goodsApi";
import { addGoodsError, addGoodsSuccess, ADD_GOODS_START } from "../addGoods-slice";

export default function* watcherAddGoodsSaga() {
  yield takeLatest(ADD_GOODS_START, addGoodsData);
}

function* addGoodsData(action) {
  try {
    debugger;
    let payload = yield call(addGoodsApi, {...action.payload});
    
    yield put(addGoodsSuccess())

  } catch (error) {
    yield put(addGoodsError(error.message))
  }
}