import { CustomError } from "./custom-error";

export class UnauthorizedError extends CustomError {
  statusCode = 401;
  reason = "Unauthorized";
  constructor() {
    super("Unauthorized");
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
  serialize() {
    return [{ message: "Unauthorized" }];
  }
}
