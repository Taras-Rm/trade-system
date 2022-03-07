import { put, takeLatest, call } from 'redux-saga/effects';
import { addGoodsApi } from '../../../../api/goodsApi';
import { addGoodsError, addGoodsSuccess, SEND_DATA_START } from '../addGoods-slice';

export default function* watcherAddGoodsSaga() {
  yield takeLatest(SEND_DATA_START, sendAddGoodsData);
}

function* sendAddGoodsData(action) {
  try {
    let payload = yield call(addGoodsApi, {...action.payload.goodObj});

    yield put(addGoodsSuccess(payload.data.profile))

  } catch (error) {
    yield put(addGoodsError(error.message))
  }
}