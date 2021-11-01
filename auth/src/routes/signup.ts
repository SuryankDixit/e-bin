/*
Check express-validator npm documetation for details.
Middleware is checking the validity of email and password
Body parameter checks the body of the incoming request
*/

import express ,{Request,Response} from 'express';
import {body, validationResult} from 'express-validator'; 
import { RequestValidationError } from '../errors/request-validation-error'; 
import { DatabaseConnectionError } from '../errors/database-connection-error';   

const router = express.Router();


router.post('/api/users/signup', [

    body('email')
        .isEmail()
        .withMessage('Enter valid email'),
    body('password')
        .trim()
        .isLength({min:4,max:20})
        .withMessage('Password must be betwwen 4 and 20 characters')
        
] ,
async (req:Request, res:Response) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array());
    } 
    console.log('Creating a user..');
    throw new DatabaseConnectionError();
    res.send({});
});

export { router as signupRouter };