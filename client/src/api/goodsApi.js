import { httpService } from "../common/services/httpService";


export const addGoodsApi = (data) => httpService.post('/good', data);

export const getAllGoodsApi = () => httpService.get('/good');


export const getAllGoodsForSellApi = () => httpService.get('/good/goods/sale');

export const getAllBuyedGoodsApi = () => httpService.get('/good/goods/buy');

export const getAllSoldGoodsApi = () => httpService.get('/good/goods/sold');


export const deleteGoodsForSellApi = (goodId) => httpService.delete(`/good/${goodId}`);

export const updateGoodsForSellApi = (good) => httpService.put(`/good/${good.goodId}`, good);

export const buyGoodApi = (goodId) => httpService.post(`/good/buy/${goodId}`);