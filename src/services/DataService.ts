import IStockParams from '../interfaces/IStockParams';
import IStockData from '../interfaces/IStockData';
import RedisRepository from '../repositories/RedisRepository';
import StockDataRespository from '../repositories/StockDataRepository';

/**
 * coordinate among different data sources
 */
export default class DataService {
  redisRepository;
  apiRepository;

  constructor(
    redisRepository = new RedisRepository(),
    apiRepository = new StockDataRespository(process.env.STOCK_URL)
  ) {
    this.redisRepository = redisRepository;
    this.apiRepository = apiRepository;
  }

  getCached(key: string): Promise<any> {
    return this.redisRepository.find(key);
  }

  /**
   * nothing clever, saving the query as a key
   * and the data as the value
   */
  async saveToCache(key: string, data: IStockData[]): Promise<void> {
    await this.redisRepository.save(key, data);
  }

  getFromApi(params: IStockParams): Promise<IStockData | null>{
    return this.apiRepository.find(params);
  }

  buildKeyFromParams(params: {[key: string]: any}): string {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }

  /**
   * 
   * see if already cached in redis
   * get any needed data from api
   * cache in redis and return data
   */
  async getStockData(params: IStockParams): Promise<IStockData> {
    const key = this.buildKeyFromParams(params);
    let data = await this.getCached(key);

    // if no data found in redis, get from api and save to redis
    // so next time we can save an api call
    if (!data){
      data = await this.getFromApi(params);
      await this.saveToCache(key, data);
    }
    return data;
  }
}

