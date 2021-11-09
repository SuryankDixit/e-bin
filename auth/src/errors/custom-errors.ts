export abstract class CustomError extends Error {
  abstract statusCode: number; //abstract means this has to be implemented

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): {
    message: string,
    field? : string //? means optional
  }[]
}

//this whole part is to ensure that the error classes getting created follow a consistent format and also that using
//polymorphism the express error middleware can just have one if statement and it sends only one formatted error message
//regardless of the error type
//this ensures that when our react frontend gets an error message it doesnt have to worry about different ways to interpret it.
//since every message error format is same there is only a need for one type of handler in the frontend and so there is like one
//single way of sending the error from the express server and one single way of getting the error at the frontend