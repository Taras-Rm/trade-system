import { call, put, takeLatest } from "redux-saga/effects";
import { getUserDataApi } from "../../../../api/userApi";
import { getUserDataError, getUserDataSuccess, GET_USER_DATA_START } from "../goodAd-slice";

export default function* watcherUserSaga() {
  yield takeLatest(GET_USER_DATA_START, getUserData);

}

function* getUserData(action) {
  try {
    debugger
    let payload = yield call(getUserDataApi, action.payload);
    
    yield put(getUserDataSuccess(payload.data.user))

  } catch (error) {
    yield put(getUserDataError(error.message))
  }
}