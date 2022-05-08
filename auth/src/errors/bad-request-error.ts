import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
  serialize=()=>{
    return [{ message: this.message }];
  }
}
