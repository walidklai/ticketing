import express, { Request } from "express";
import { run } from "./config/run";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { authRouter } from "./routes";
require("express-async-errors");

const app = express();

app.use(express.json());

app.use("/api/users", authRouter);

app.all("*", (req: Request) => {
  throw new NotFoundError(req.path);
});

app.use(errorHandler);

run(app)

