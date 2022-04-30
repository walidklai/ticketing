import { Request, Response, Router } from "express";

const router = Router();

router.get("/signout", (req:Request, res:Response) => {
  res.send("signout");
});

export { router as signOutRouter };
