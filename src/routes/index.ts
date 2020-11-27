import { Router } from 'express';
import ascii from './ascii';

// guaranteed to get dependencies
export default function routes(){
  const router = Router();
  
  ascii(router);  
	return router
}
