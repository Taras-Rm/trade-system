import { httpService } from "../common/services/httpService";


export const getProfileDataApi = () => httpService.get('/user/profile');

export const updateProfileDataApi = (data) => httpService.put('/user/profile', data);