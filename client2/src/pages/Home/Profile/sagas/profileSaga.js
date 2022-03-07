import { put, takeLatest, call } from 'redux-saga/effects';
import { getProfileDataApi } from '../../../../api/profileApi';
import { getLoginError } from '../../../Login/login-slice';
import { getProfileSuccess, LOAD_DATA_START } from '../profile-slice';

export default function* watcherProfileSaga() {
  yield takeLatest(LOAD_DATA_START, getProfileData);
}

function* getProfileData() {
  try {
    let payload = yield call(getProfileDataApi);

    yield put(getProfileSuccess(payload.data.profile))

  } catch (error) {
    yield put(getLoginError(error.message))
  }
}