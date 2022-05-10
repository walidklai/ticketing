import { Router } from "express";

const router = Router();

router.post("/signin", (req, res) => {
  res.send("signin");
});

export { router as signInRouter };

