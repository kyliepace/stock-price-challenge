import expressLoader from './express';
import Logger from './Logger';


export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};