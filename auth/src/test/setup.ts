import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

let mongo: any;
let OLD_ENV: any;

beforeAll(async () => {
  OLD_ENV = process.env;
  process.env.JWT_SECRET = "testSecret";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  process.env = OLD_ENV;
  await mongo.stop();
  await mongoose.connection.close();
});
