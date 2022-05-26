import addGoodsReducer from "../pages/Home/AddGoods/addGoods-slice";
import getUserReducer from "../pages/Home/GoodAd/goodAd-slice";
import goodsReducer from "../pages/Home/Goods/goods-slice";
import myGoodsReducer from "../pages/Home/MyGoods/myGoods-slice";
import profileReducer from "../pages/Home/Profile/profile-slice";
import loginReducer from "../pages/Login/login-slice";
import registrationReducer from "../pages/Register/registration-slice";

export const reducers = {
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    goods: goodsReducer,
    addGoods: addGoodsReducer,
    myGoods: myGoodsReducer,
    user: getUserReducer,
};
