import { all, fork } from 'redux-saga/effects';
import watcherAddGoodsSaga from '../pages/Home/AddGoods/sagas/addGoodsSaga';
import watcherChartsSaga from '../pages/Home/Charts/sagas/chartsSaga';
import watcherUserSaga from '../pages/Home/GoodAd/sagas/goodAdSaga';
import watcherAllGoodsSaga from '../pages/Home/Goods/sagas/goodsSaga';
import watcherMyGoodsSaga from '../pages/Home/MyGoods/sagas/myGoodsSaga';
import watcherProfileSaga from '../pages/Home/Profile/sagas/profileSaga';
import watcherLoginByTokensSaga from '../pages/Login/sagas/loginByTokensSaga';
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
     watcherMyGoodsSaga,
     watcherLoginByTokensSaga,
     watcherUserSaga,
     watcherChartsSaga,
    ].map(fork)
  );
}
