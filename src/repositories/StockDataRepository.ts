import ApiClient from '../clients/ApiClient';
import IRequestParams from '../interfaces/IStockParams';
import * as constants from '../constants/config.json';
import IStockData from '../interfaces/IStockData';
import logger from '../loaders/Logger';

export default class StockDataRepository {
  client;

  constructor(baseURL: string = constants.STOCK_URL) {
    this.client = new ApiClient(baseURL);
  }

  /**
   * 
   * get data from api and return the daily prices
   */
  async find(params: IRequestParams): Promise<IStockData | null> {
    const data = await this.client.get('/', params);
    if (!data){ return null; }
    logger.info(`data found from stock data api`);
    return data.daily_prices;
  }
}