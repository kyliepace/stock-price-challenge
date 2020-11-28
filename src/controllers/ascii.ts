import { Request, Response, NextFunction } from 'express';
import StockParams from '../models/StockParams';
import DataService from '../services/DataService';

const dataService = new DataService();

export default async function(req: Request, res: Response, next: NextFunction) {
  const params = new StockParams(req.query);
  try {
    params.validate();
  }
  catch(err){
    res.status(400).send(err.message);
  }

  // use redis cache based on combo of symbol + date range
  const stockData = await dataService.getStockData({
    symbol: params.symbol,
    since: params.since,
    until: params.until
  });

  // do d3 stuff

  res.send('hello world');
}