import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";


export class RequestValidationError extends CustomError {

  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    //Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serializeErrors() {
    return this.errors.map(err => {
      return {message: err.msg, field: err.param}
    })
  }
}

//i dont understand why we created two classes for handling will watch the whole thing again tomorrowS