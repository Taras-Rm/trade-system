import { ACCESS_TOKEN, REFRESH_TOKEN } from "../common/constants/constants";
import { getItemFromLocalStorage } from "../common/helpers/getItemFromLocalStorage";
import { httpService } from "../common/services/httpService";


export const logoutApi = () => httpService.post('/auth/logout', {
    AccessToken: getItemFromLocalStorage(ACCESS_TOKEN) || '',
    RefreshToken: getItemFromLocalStorage(REFRESH_TOKEN)
});