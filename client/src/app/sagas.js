import { all, fork } from 'redux-saga/effects';
import watcherLoginSaga from '../pages/login/sagas/loginSaga';


export function* rootSagas() {
  yield all(
    [
     watcherLoginSaga
    ].map(fork)
  );
}
