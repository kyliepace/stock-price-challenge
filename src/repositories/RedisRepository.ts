import RedisClient from "../clients/RedisClient";

export default class RedisRepository {
  client;

  constructor(client = RedisClient.client) {
    this.client = client;
  }

  save(key: string, value: string): Promise<string | null>{
    return this.client.set(key, value);
  }

  find(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}