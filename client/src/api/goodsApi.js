import { httpService } from "../common/services/httpService";


export const addGoodsApi = (data) => httpService.post('/good', data);

export const getAllGoodsApi = () => httpService.get('/good');