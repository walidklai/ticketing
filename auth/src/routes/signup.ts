import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/UserModel";

const router = Router();

const entriesValidation = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 8, max: 22 })
    .withMessage("Password must be between 8 and 22 characters"),
];

router.post(
  "/signup",
  entriesValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) throw new BadRequestError(`${email} already in use`)

    const newUser = User.build({ email, password });

    await newUser.save();

    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
