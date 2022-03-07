import { httpService } from "../common/services/httpService";


export const addGoodsApi = (data) => httpService.post('/good', data);

export const getAllGoodsApi = () => httpService.get('/good');

export const getAllGoodsForSaleApi = () => httpService.get('/good/goods/sale');

export const getAllBuyedGoodsApi = () => httpService.get('/good/goods/buy');