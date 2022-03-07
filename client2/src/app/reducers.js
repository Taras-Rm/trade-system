//import addGoodsReducer from "../pages/home/addGoods/addGoods-slice";

import goodsReducer from "../pages/Home/Goods/goods-slice";
import profileReducer from "../pages/Home/Profile/profile-slice";
import loginReducer from "../pages/Login/login-slice";
import registrationReducer from "../pages/Register/registration-slice";

export const reducers = {
    login: loginReducer,
    profile: profileReducer,
    registration: registrationReducer,
    goods: goodsReducer
    //addGoods: addGoodsReducer
};
