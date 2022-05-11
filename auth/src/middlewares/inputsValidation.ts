import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
  next();
};

export const basicCredentialsValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 8, max: 22 })
    .withMessage("Password must be between 8 and 22 characters"),
  validate,
];
