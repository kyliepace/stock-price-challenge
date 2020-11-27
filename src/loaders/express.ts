import express from 'express';
import bodyParser from 'body-parser';
import * as rTracer from 'cls-rtracer';
import cors from 'cors';
import morgan from 'morgan';
import { handleError } from '../routes/middleware';
import routes from '../routes';

export default (app: express.Application ) => {

  // throw this in now so can't forget later
  app.use(cors());

  // use morgan to log http requests
  app.use(morgan('tiny'));

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // inject a request id
  app.use(rTracer.expressMiddleware())

  // routes
  app.use(routes());

  // error handling
  app.use(handleError)
};