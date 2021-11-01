export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // field? means , it is not compulsory field
      abstract serializeErrors(): { message: string; field?: string }[];
}