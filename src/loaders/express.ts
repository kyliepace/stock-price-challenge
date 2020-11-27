import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../routes';

export default (app: express.Application ) => {

  // throw this in now so can't forget later
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // routes & error handling
  app.use(routes());
};