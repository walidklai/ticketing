import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  reason = "Not Found";
  statusCode = 404;
  constructor(public url?: string) {
    super(`${url} not found`);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serialize() {
    return [{ message: this.reason ,field:this.url}];
  }
}
