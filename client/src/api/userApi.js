import { httpService } from "../common/services/httpService";


export const getUserDataApi = (userId) => httpService.get(`/user/profile/${userId}`, userId);