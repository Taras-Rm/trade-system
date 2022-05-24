import { httpService } from "../common/services/httpService";

export const loginByTokensApi = (data) => httpService.post('/auth/loginByToken', data)