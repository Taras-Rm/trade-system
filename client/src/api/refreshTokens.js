import { REFRESH_TOKEN } from '../common/constants/constants';
import { getItemFromLocalStorage } from '../common/helpers/getItemFromLocalStorage';
import { httpService } from '../common/services/httpService';

export const refreshTokenApi = () => httpService.post('/auth/refresh', {
  RefreshToken: getItemFromLocalStorage(REFRESH_TOKEN)
})