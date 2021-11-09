import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route not found')
  }

  serializeErrors() {
    return [
      {
        message: "not found"
      }
    ]
  }
}