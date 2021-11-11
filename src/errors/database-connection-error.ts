import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = "Error connecting to database";

    constructor() {
        super('Error connecting to database');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [
            {
                message: this.reason,
            },
        ];
    }
}
/* 
    returning array of objects;
    in error handler middleware , we make an object 
    {
        errors: {
            {},
            {},
        }
    }
    and this object will be parsed by react app
*/