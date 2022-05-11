import { Request, Response, Router } from "express";
import { basicCredentialsValidation } from "../validation/inputs/auth-inputs";

const router = Router();

router.post(
  "/signin",
  basicCredentialsValidation,
  (req: Request, res: Response) => {
    res.send("yes")
  }
);

export { router as signInRouter };
