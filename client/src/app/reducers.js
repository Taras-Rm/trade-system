import profileReducer from "../pages/home/profile/profile-slice";
import loginReducer from "../pages/login/login-slice";

export const reducers = {
    login: loginReducer,
    profile: profileReducer
};
