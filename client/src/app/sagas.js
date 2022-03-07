import { all, fork } from 'redux-saga/effects';
import watcherAddGoodsSaga from '../pages/Home/AddGoods/sagas/addGoodsSaga';
import watcherAllGoodsSaga from '../pages/Home/Goods/sagas/goodsSaga';
import watcherProfileSaga from '../pages/Home/Profile/sagas/profileSaga';
import watcherLoginSaga from '../pages/Login/sagas/loginSaga';
import watcherRegistrationSaga from '../pages/Register/sagas/registrationSaga';

export function* rootSagas() {
  yield all(
    [
     watcherLoginSaga,
     watcherProfileSaga,
     watcherRegistrationSaga,
     watcherAllGoodsSaga,
     watcherAddGoodsSaga,
    ].map(fork)
  );
}
