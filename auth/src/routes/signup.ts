/*
Check express-validator npm documetation for details.
Middleware is checking the validity of email and password
Body parameter checks the body of the incoming request
*/

import express ,{Request,Response} from 'express';
import {body, validationResult} from 'express-validator';     

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
(req:Request, res:Response) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        // error object is converted into array of errors.
        return res.status(400).send(errors.array());
    }
    const { email, password} = req.body;
    console.log('Creating a user..');
    res.send({});
});

export { router as signupRouter };