import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { User } from "../models/user";
import jwt from 'jsonwebtoken'
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middleware/validate-request";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {

     
    const {email, password} = req.body;
    //the findone will search for email and if it does it will
    //asign to exisitingUser and then we check if it null or not
    //if null then no user and we can use the new email
    const existingUser = await User.findOne({ email });
     
    if(existingUser) {
      console.log('Email is in use');
      throw new BadRequestError('Email in use')
    }
    
    const user = User.build({email, password});
    //building

    await user.save();
    //saving them to database

    //generate wecbtoken and store it on object
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY! )

    req.session = {
      jwt: userJwt
    }

    res.status(201).send(user);
    //sends back the user as a result

  }
);

export { router as signupRouter };
