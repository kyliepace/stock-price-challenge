import { Request, Response } from 'express';
import StockToGraphAdaptor from '../adaptors/StockToGraph';
import { Price } from '../enums/Price';
import IStockData from '../interfaces/IStockData';
import StockParams from '../models/StockParams';
import DataService from '../services/DataService';
import GraphService from '../services/GraphService';

const dataService = new DataService();
const graphService = new GraphService();

export default async function(req: Request, res: Response) {
  const params = new StockParams(req.query);
  try {
    params.validate();
  }
  catch(err){
    res.status(400).send(err.message);
  }

  // use redis cache based on combo of symbol + date range
  const stockData: IStockData = await dataService.getStockData({
    symbol: params.symbol,
    since: params.since,
    until: params.until
  });

  // do d3 stuff
  const stockToGraphAdaptor = new StockToGraphAdaptor(stockData);
  const transformedData = stockToGraphAdaptor.filter(req.query.price as Price);
  const label = stockToGraphAdaptor.makeLabel(req.query);
  await graphService.draw(transformedData, label);
  res.sendStatus(200);
}