import { Application } from "express";
import mongoose from "mongoose";

export const run = async (app: Application) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_KEY is not defined");

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017");
    console.log("\x1b[36m%s\x1b[0m", "Database connected");
  } catch (error) {
    console.error(error);
  }
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};
