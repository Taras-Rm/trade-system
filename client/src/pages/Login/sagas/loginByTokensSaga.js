import { put, takeLatest, call } from 'redux-saga/effects';
import { getLoginSuccess, START_BY_TOKENS } from '../login-slice';
import { setItemToLocalStorage } from '../../../common/helpers/setItemToLocalStorage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../common/constants/constants';
import { getProfileSuccess } from '../../Home/Profile/profile-slice';
import { loginByTokensApi } from '../../../api/loginByTokenApi';



export default function* watcherLoginByTokensSaga() {
    yield takeLatest(START_BY_TOKENS, getLoginByTokensUser);
}
  
  function* getLoginByTokensUser(action) {
    try {
      const payload = yield call(loginByTokensApi, action.payload);
  
      yield put(getLoginSuccess());
      yield put(getProfileSuccess(payload.data.data))
  
      if (payload.data.data.accessToken) {
        setItemToLocalStorage(ACCESS_TOKEN, payload.data.data.AccessToken);
      }
      if (payload.data.data.refreshToken) {
        setItemToLocalStorage(REFRESH_TOKEN, payload.data.data.RefreshToken);
      }
    } catch (error) {
  
    }
  }
  