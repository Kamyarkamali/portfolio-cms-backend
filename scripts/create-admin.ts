import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../src/config/env";
import { connectDatabase } from "../src/config/database";
import { AdminModel } from "../src/models/admin.model";
import { hashPassword } from "../src/services/auth.service";

const createAdmin = async (): Promise<void> => {
  if (config.nodeEnv === "production") {
    throw new Error("The admin creation script is disabled in production");
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  if (password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  }

  await connectDatabase();

  const existingAdmin = await AdminModel.findOne({ email });
  if (existingAdmin) {
    throw new Error("An admin with this email already exists");
  }

  await AdminModel.create({
    email,
    passwordHash: await hashPassword(password),
    role: "admin",
  });

  console.log(`Admin created: ${email}`);
};

createAdmin()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : "Admin creation failed");
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
