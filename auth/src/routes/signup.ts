/*
Check express-validator npm documetation for details.
Middleware is checking the validity of email and password
Body parameter checks the body of the incoming request
*/

import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError} from '@sdebin/common';
import { User } from '../models/user';

const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError('Email in use');
        }

        const user = User.build({ email, password });
        await user.save();

        // generate json web token 
        // jwt.sign(payload,key,callback);
        
        const userJwt = jwt.sign({
            id:user.id,
            email: user.email
        },process.env.JWT_KEY!);                // ! says to ts that dont worry , i have checked it.
 

        /*
            and store it on the session object

            req.session.jwt = userJwt;

            thats how we do it in javascript

            in typescript , you need to make complate object as below 
            because typescript doesn't want us to assume that there is object named session in request
        */  

            req.session = {
                jwt: userJwt
            }

        res.status(201).send(user);
    }
);

export { router as signupRouter };