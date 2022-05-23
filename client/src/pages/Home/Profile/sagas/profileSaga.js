import { put, takeLatest, call } from 'redux-saga/effects';
import { getAllBuyedGoodsApi, getAllSoldGoodsApi } from '../../../../api/goodsApi';
import { getProfileDataApi, updateProfileDataApi } from '../../../../api/profileApi';
import { getLoginError } from '../../../Login/login-slice';
import { getBuyedGoodsError, getBuyedGoodsSuccess, getProfileStart, getProfileSuccess, getSoldGoodsError, getSoldGoodsSuccess, LOAD_DATA_START, START_GET_BUYED_GOODS, START_GET_SOLD_GOODS, START_UPDATE, updateProfileError, updateProfileSuccess } from '../profile-slice';

export default function* watcherProfileSaga() {
  yield takeLatest(LOAD_DATA_START, getProfileData);
  yield takeLatest(START_UPDATE, updateProfileData);

  yield takeLatest(START_GET_BUYED_GOODS, getBuyedGoods);
  yield takeLatest(START_GET_SOLD_GOODS, getSoldGoods);

}

function* getProfileData() {
  try {
    let payload = yield call(getProfileDataApi);

    yield put(getProfileSuccess(payload.data.profile))

  } catch (error) {
    yield put(getLoginError(error.message))
  }
}

function* updateProfileData(action) {
  try {
    let payload = yield call(updateProfileDataApi, action.payload);

    yield put(updateProfileSuccess(payload.data.profile))
    // get all new goods for sell
    yield put(getProfileStart())

  } catch (error) {
    yield put(updateProfileError(error.message))
  }
}

function* getBuyedGoods() {
  try {
    let payload = yield call(getAllBuyedGoodsApi);
    
    yield put(getBuyedGoodsSuccess(payload.data.goods))

  } catch (error) {
    yield put(getBuyedGoodsError(error.message))
  }
}

function* getSoldGoods() {
  try {
    let payload = yield call(getAllSoldGoodsApi);
    
    yield put(getSoldGoodsSuccess(payload.data.goods))

  } catch (error) {
    yield put(getSoldGoodsError(error.message))
  }
}