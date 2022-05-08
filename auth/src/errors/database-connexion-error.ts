import { CustomError } from "./custom-error";

export class DatabaseConnexionError extends CustomError {
  statusCode = 500;
  reason = "Database connexion failed";
  constructor() {
    super("Database Error");
    Object.setPrototypeOf(this, DatabaseConnexionError.prototype)
  }
  serialize=()=> {
    return [{ message: this.reason }];
  }
}
