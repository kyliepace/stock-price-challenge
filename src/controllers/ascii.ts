import { Request, Response, NextFunction } from 'express';
import redisService from '../services/redis';
import logger from '../loaders/Logger';

export default function(req: Request, res: Response, next: NextFunction) {
  // do redis stuff

  // do d3 stuff

  res.send('hello world');
}