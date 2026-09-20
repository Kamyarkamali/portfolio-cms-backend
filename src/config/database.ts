import mongoose from "mongoose";
import { config } from "./env";

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(config.mongodbUri);
  console.log("Connected to MongoDB");
};
