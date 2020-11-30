import RedisClient from '../clients/RedisClient';
import logger from '../loaders/Logger';

export default class RedisRepository {
  client;

  constructor(client = RedisClient.client) {
    this.client = client;
  }

  save<T>(key: string, data: T): Promise<string | null> {
    const value = this.parseDataToString(data);
    logger.info(`data saved in redis`)
    return this.client.set(key, value);
  }

  async find<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    logger.info(`data found in redis`)
    return this.parseDataToJson(data);
  }

  parseDataToJson<T>(data: string | null): T {
    return !data ? 
      null : 
      typeof data === 'object' ?
        data:
        JSON.parse(data);
  }

  parseDataToString<T>(data: T): string {
    return typeof data === 'string' ? 
      data :
      JSON.stringify(data);
  }
}