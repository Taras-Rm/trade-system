import { put, takeLatest, call } from 'redux-saga/effects';
import { getAllGoodsApi } from '../../../../api/addGoodsApi';
import { getAllGoodsError, getAllGoodsStart, getAllGoodsSuccess, GET_ALL_GOODS_START } from '../goods-slice';

export default function* watcherAllGoodsSaga() {
  yield takeLatest(GET_ALL_GOODS_START, getAllGoods);
}

function* getAllGoods() {
  try {
    let payload = yield call(getAllGoodsApi);

    yield put(getAllGoodsSuccess(payload.data.goods))

  } catch (error) {
    yield put(getAllGoodsError(error.message))
  }
}