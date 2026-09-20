import { Schema, model, type HydratedDocument } from "mongoose";

export interface Admin {
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AdminDocument = HydratedDocument<Admin>;

const adminSchema = new Schema<Admin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      required: true,
      default: "admin",
      trim: true,
    },
  },
  { timestamps: true },
);

export const AdminModel = model<Admin>("Admin", adminSchema);
