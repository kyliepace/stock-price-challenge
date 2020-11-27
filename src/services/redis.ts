import Redis from 'ioredis';

class RedisService {
  client;

  // init redis; how to use: https://github.com/luin/ioredis#basic-usage
  constructor() {
    this.client = new Redis();
  }
}

export default RedisService;