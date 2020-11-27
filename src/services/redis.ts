import RedisClient from "../clients/RedisClient";

class RedisService {
  client;

  constructor(client = RedisClient) {
    this.client = client;
  }
}

export default RedisService;