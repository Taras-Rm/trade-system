import { all, fork } from 'redux-saga/effects';
import watcherAddGoodsSaga from '../pages/home/addGoods/sagas/addGoodsSaga';
import watcherProfileSaga from '../pages/home/profile/sagas/profileSaga';
import watcherLoginSaga from '../pages/login/sagas/loginSaga';
import watcherRegistrationSaga from '../pages/registration/sagas/registrationSaga';


export function* rootSagas() {
  yield all(
    [
     watcherLoginSaga,
     watcherRegistrationSaga,
     watcherProfileSaga,
     watcherAddGoodsSaga,
    ].map(fork)
  );
}
