import { httpService } from "../common/services/httpService";


export const addGoodsApi = (data) => httpService.post('/good', data);