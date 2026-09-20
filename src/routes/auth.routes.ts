import { Router } from "express";
import { config } from "../config/env";
import { getAuthCookieName, requireAuth } from "../middleware/auth";
import { authenticateAdmin, createAdminToken } from "../services/auth.service";

export const authRouter = Router();

const cookieOptions = {
  httpOnly: true,
  secure: config.nodeEnv === "production",
  sameSite: "lax" as const,
  path: "/",
};

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body as { email?: unknown; password?: unknown };

    if (typeof email !== "string" || typeof password !== "string" || !email.trim() || !password) {
      res.status(400).json({ success: false, message: "Email and password are required" });
      return;
    }

    const admin = await authenticateAdmin(email.trim().toLowerCase(), password);

    if (!admin) {
      res.status(401).json({ success: false, message: "Invalid email or password" });
      return;
    }

    res.cookie(getAuthCookieName(), createAdminToken(admin), cookieOptions);
    res.json({ success: true, admin });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", (_req, res) => {
  res.clearCookie(getAuthCookieName(), cookieOptions);
  res.json({ success: true, message: "Logged out successfully" });
});

authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ success: true, admin: req.admin });
});
