import { httpService } from "../common/services/httpService";


export const getChartsApi = () => httpService.get('/chart', );

export const getGoodCategoryApi = () => httpService.get('/chart/category', );