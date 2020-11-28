import RedisClient from '../clients/RedisClient';

export default class RedisRepository {
  client;

  constructor(client = RedisClient.client) {
    this.client = client;
  }

  save<T>(key: string, data: T): Promise<string | null> {
    const value = this.parseDataToString(data);
    return this.client.set(key, value);
  }

  async find<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
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