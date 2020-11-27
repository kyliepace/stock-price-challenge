import { Router, Request, Response } from 'express';
import ascii from './ascii';

// guaranteed to get dependencies
export default function routes(){
  const app = Router();
  ascii(app);  
	return app
}

export function handleError(err: Error, req: Request, res: Response){
  res.status(500);
  res.json({
    errors: {
      message: err.message
    }
  })
}