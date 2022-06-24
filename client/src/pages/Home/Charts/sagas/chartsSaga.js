import { put, takeLatest, call } from 'redux-saga/effects';
import { getChartsApi, getGoodCategoryApi } from '../../../../api/chartsApi';
import { getCategoryGoodsError, getCategoryGoodsSuccess, getChartsDataError, getChartsDataSuccess, GET_CHARTS_DATA_START, GET_GOODS_CATEGORY_START } from '../charts-slice';

export default function* watcherChartsSaga() {
  yield takeLatest(GET_GOODS_CATEGORY_START, getCategoryGoodsData);

  yield takeLatest(GET_CHARTS_DATA_START, getChartsData);
}

function* getChartsData() {
  try {
    let payload = yield call(getChartsApi);

    yield put(getChartsDataSuccess(payload.data.data))

  } catch (error) {
    yield put(getChartsDataError(error.message))
  }
}

function* getCategoryGoodsData() {
  try {
    let payload = yield call(getGoodCategoryApi);

    yield put(getCategoryGoodsSuccess(payload.data.data))

  } catch (error) {
    yield put(getCategoryGoodsError(error.message))
  }
}