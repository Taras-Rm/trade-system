import { call, put, takeLatest } from "redux-saga/effects";
import { registrationApi } from "../../../api/registrationApi";
import {
  getRegistrationError,
  getRegistrationSuccess,
  START,
} from "../registration-slice";

export default function* watcherRegistrationSaga() {
  yield takeLatest(START, getRegistrationUser);
}

function* getRegistrationUser(action) {
  try {
    let payload = yield call(registrationApi, { ...action.payload });

    yield put(getRegistrationSuccess());
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      yield put(getRegistrationError(error.response.data.error));
    } else {
      yield put(getRegistrationError(error.message));
    }
  }
}
