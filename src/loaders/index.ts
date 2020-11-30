import express from 'express';
import expressLoader from './express';
import logger from './Logger';


export default async () => {
  const app = express();
  await expressLoader(app);
  logger.info('✌️ Express loaded');
  return app;
};