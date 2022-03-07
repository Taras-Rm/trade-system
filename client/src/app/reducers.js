import addGoodsReducer from "../pages/home/addGoods/addGoods-slice";
import getAllGoodsReducer from "../pages/home/goods/goods-slice";
import profileReducer from "../pages/home/profile/profile-slice";
import loginReducer from "../pages/login/login-slice";

export const reducers = {
    login: loginReducer,
    profile: profileReducer,
    addGoods: addGoodsReducer,
    allGoods: getAllGoodsReducer
};
