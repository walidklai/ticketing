import { Router, Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { User } from "../models/UserModel";
import { basicCredentialsValidation } from "../validation/inputs/auth-inputs";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/signup",
  basicCredentialsValidation,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) throw new BadRequestError(`${email} already in use`);

    const newUser = User.build({ email, password });

    await newUser.save();

    const jwtPayload = {
      id: newUser.id,
      email: newUser.email,
    };

    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

    req.session = {
      jwt: token,
    };

    res.status(201).send(newUser);
  }
);

export { router as signUpRouter };
