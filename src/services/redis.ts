import RedisClient from "../clients/RedisClient";
import RedisRepository from "../repositories/RedisRepository";

class RedisService {
  repository;

  constructor(repository = new RedisRepository()) {
    this.repository = repository;
  }
}

export default RedisService;