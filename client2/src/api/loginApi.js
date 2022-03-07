import { httpService } from "../common/services/httpService";


export const loginApi = (data) => httpService.post('/auth/login', data);