import { Router } from 'express';
import asciiController from '../controllers/ascii';

// don't really need route just yet
// but will make life easier if api is expanded
const route = Router();

/**
 * REST endpoints for /ascii path
 */
export default (router: Router) => {
  // use the following route instructions for all endpoints on /ascii path
  router.use('/ascii', route);

  // if GET /ascii, use asciiController to handle request and send response
  route.get('/', asciiController);
};