import { all, fork } from 'redux-saga/effects';
import watcherAllGoodsSaga from '../pages/Home/Goods/sagas/goodsSaga';
import watcherProfileSaga from '../pages/Home/Profile/sagas/profileSaga';
import watcherLoginSaga from '../pages/Login/sagas/loginSaga';
import watcherRegistrationSaga from '../pages/Register/sagas/registrationSaga';
///import watcherAddGoodsSaga from '../pages/home/addGoods/sagas/addGoodsSaga';
//import watcherProfileSaga from '../pages/home/profile/sagas/profileSaga';
//import watcherRegistrationSaga from '../pages/registration/sagas/registrationSaga';


export function* rootSagas() {
  yield all(
    [
     watcherLoginSaga,
     watcherProfileSaga,
     watcherRegistrationSaga,
     watcherAllGoodsSaga,
    // watcherRegistrationSaga,
    // watcherAddGoodsSaga,
    ].map(fork)
  );
}
