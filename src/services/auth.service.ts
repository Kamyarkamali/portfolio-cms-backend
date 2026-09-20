import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../config/env";
import { AdminModel } from "../models/admin.model";
import type { AuthTokenPayload, SafeAdmin } from "../types/auth";

const passwordRounds = 12;

export const toSafeAdmin = (admin: { _id: { toString(): string }; email: string; role: string }): SafeAdmin => ({
  id: admin._id.toString(),
  email: admin.email,
  role: admin.role,
});

export const authenticateAdmin = async (email: string, password: string): Promise<SafeAdmin | null> => {
  const admin = await AdminModel.findOne({ email }).select("+passwordHash");

  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return null;
  }

  return toSafeAdmin(admin);
};

export const createAdminToken = (admin: SafeAdmin): string => {
  const payload: AuthTokenPayload = { sub: admin.id, role: admin.role };
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as SignOptions["expiresIn"],
  });
};

export const verifyAdminToken = (token: string): AuthTokenPayload => {
  const payload = jwt.verify(token, config.jwtSecret);

  if (typeof payload !== "object" || typeof payload.sub !== "string" || typeof payload.role !== "string") {
    throw new Error("Invalid authentication token");
  }

  return { sub: payload.sub, role: payload.role };
};

export const findSafeAdminById = async (id: string): Promise<SafeAdmin | null> => {
  const admin = await AdminModel.findById(id).select("email role");
  return admin ? toSafeAdmin(admin) : null;
};

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, passwordRounds);
