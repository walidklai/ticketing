require("express-async-errors");
import express, { Request } from "express";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routes";
import cookieSession from "cookie-session";

const app = express();

app.set("trust-proxy", true);

app.use(
  cookieSession({
    name: "session",
    keys: ["jwt"],
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(express.json());

app.use("/api/users", authRouter);

app.all("*", (req: Request) => {
  throw new NotFoundError(req.path);
});

app.use(errorHandler);

export { app };
