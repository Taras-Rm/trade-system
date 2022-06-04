import { put, takeLatest, call } from 'redux-saga/effects';
import { getChartsApi } from '../../../../api/chartsApi';
import { getChartsDataError, getChartsDataSuccess, GET_CHARTS_DATA_START } from '../charts-slice';

export default function* watcherChartsSaga() {
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