import { all, fork } from 'redux-saga/effects';
import watcherLoginSaga from '../pages/login/sagas/loginSaga';
import watcherRegistrationSaga from '../pages/registration/sagas/registrationSaga';


export function* rootSagas() {
  yield all(
    [
     watcherLoginSaga,
     watcherRegistrationSaga
    ].map(fork)
  );
}
