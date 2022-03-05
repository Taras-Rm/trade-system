import { httpService } from "../common/services/httpService";


export const getProfileDataApi = (data) => httpService.get('/user/profile');