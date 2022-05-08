import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public reasons: ValidationError[]) {
    super("Request Validation Error");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serialize=()=> {
    return this.reasons.map((e) => ({
      message: e.msg,
      param: e.param,
    }));
  }
}
