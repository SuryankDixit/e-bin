import {Request, Response, NextFunction} from 'express'
import { CustomError } from '../errors/custom-errors'
export const errorHandler = (err: Error, req: Request, res: Response, next:NextFunction) =>{
  
  if(err instanceof CustomError) {
    return res.status(err.statusCode).send({errors: err.serializeErrors()}) //errors is an array of objects, everything is
  }

  res.status(400).send({
    errors: [{
      message: "Something went wrong"
    }]
  })
}
