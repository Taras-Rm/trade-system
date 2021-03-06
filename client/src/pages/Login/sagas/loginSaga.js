import { put, takeLatest, call } from 'redux-saga/effects';
import { START, getLoginSuccess, getLoginError } from '../login-slice';
import { setItemToLocalStorage } from '../../../common/helpers/setItemToLocalStorage';
import { loginApi } from '../../../api/loginApi';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../common/constants/constants';
import { getProfileSuccess } from '../../Home/Profile/profile-slice';

export default function* watcherLoginSaga() {
  yield takeLatest(START, getLoginUser);
}

function* getLoginUser(action) {
  try {
    let payload = yield call(loginApi, {...action.payload});

    yield put(getLoginSuccess());
    yield put(getProfileSuccess(payload.data.data))

    setItemToLocalStorage(ACCESS_TOKEN, payload.data.data.accessToken);
    setItemToLocalStorage(REFRESH_TOKEN, payload.data.data.refreshToken);    

  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      yield put(getLoginError(error.response.data.error));
    } else {
      yield put(getLoginError(error.message));
    }
  }
}
