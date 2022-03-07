import { httpService } from "../common/services/httpService";

export const registrationApi = (data) => httpService.post('/auth/register', data);
