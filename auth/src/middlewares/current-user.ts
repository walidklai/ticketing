import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IcurrentUser {
  id: string;
  email: string;
}
/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface Request {
      currentUser?: IcurrentUser;
    }
  }
}
/* eslint-enable no-unused-vars */
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = jwt.verify(
      req.session?.jwt,
      process.env.JWT_SECRET!
    ) as IcurrentUser;
    req.currentUser = payload;
  } catch (error) {}
  next();
};
