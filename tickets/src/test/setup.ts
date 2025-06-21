import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "testkey";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  if (mongoose.connection.db) {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

declare global {
  var signin: () => string[];
}

global.signin = () => {
  const userId = new mongoose.Types.ObjectId().toHexString();
  const payload = {
    id: userId,
    email: "test@test.com",
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = JSON.stringify({ jwt: token });

  const base64 = Buffer.from(session).toString("base64");
  return [`session=${base64}`];
};
