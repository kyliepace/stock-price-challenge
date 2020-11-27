import { Router } from 'express';
import ascii from './ascii';

// guaranteed to get dependencies
export default function routes(){
  const app = Router();
  ascii(app);  
	return app
}
