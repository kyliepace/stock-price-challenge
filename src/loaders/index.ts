import express from 'express';
import expressLoader from './express';
import logger from './Logger';


export default async (app: express.Application) => {
  await expressLoader(app);
  logger.info('✌️ Express loaded');
};