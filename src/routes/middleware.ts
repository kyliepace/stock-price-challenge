import { Router, Request, Response } from 'express';

export function handleError(err: Error, req: Request, res: Response){
  res.status(500);
  res.json({
    errors: {
      message: err.message
    }
  })
}