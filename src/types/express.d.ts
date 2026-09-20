import type { SafeAdmin } from "./auth";

declare global {
  namespace Express {
    interface Request {
      admin?: SafeAdmin;
    }
  }
}

export {};
