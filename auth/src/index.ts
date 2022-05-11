require("express-async-errors");
import express, { Request } from "express";
import { run } from "./config/run";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routes";
import cookieSession from "cookie-session";

const app = express();

app.set("trust-proxy", "ticketing.dev");

app.use(
  cookieSession({
    name: "session",
    keys: ["jwt"],
    secure: false,
  })
);

app.use(express.json());

app.use("/api/users", authRouter);

app.all("*", (req: Request) => {
  throw new NotFoundError(req.path);
});

app.use(errorHandler);

run(app);
