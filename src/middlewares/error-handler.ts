// import {Request,Response,NextFunction} from 'express';

// export const errorHandler = (err: Error,req:Request,res:Response,next:NextFunction)=>{
//     console.log("Something went wrong ",err);
//     res.status(400).send({
//         message:err.message
//     } )
// }

import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: "Something went wrong" }],
    });
};