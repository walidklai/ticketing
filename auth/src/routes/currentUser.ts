import { Router } from "express";

const router = Router();

router.get("/currentuser", (req, res) => {
  res.send("test after");
});

export { router as currentUserRouter };
