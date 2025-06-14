import { app } from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
    console.log("connected to mongo");
  } catch (error) {
    console.error(error);
  }
  app.listen(PORT, () => {
    console.log(`Auth service is running on port ${PORT}!!`);
  });
};

start();
