import { Request, Response, Router } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { basicCredentialsValidation } from "../middlewares/inputsValidation";
import { User } from "../models/UserModel";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = Router();

router.post(
  "/signin",
  basicCredentialsValidation,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) throw new BadRequestError("Wrong Email or Password");

    const passwordMatch = await Password.compare(userExists.password, password);

    if (!passwordMatch) throw new BadRequestError("Wrong Email or Password");

    const payload = {
      id: userExists.id,
      email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!);

    req.session = {
      jwt: token,
    };

    res.status(200).send(userExists);
  }
);

export { router as signInRouter };
