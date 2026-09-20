import type { RequestHandler } from "express";
import { findSafeAdminById, verifyAdminToken } from "../services/auth.service";

const cookieName = "admin_token";

const getCookie = (cookieHeader: string | undefined, name: string): string | undefined => {
  const cookie = cookieHeader?.split(";").find((part) => part.trim().startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.trim().slice(name.length + 1)) : undefined;
};

export const getAuthCookieName = (): string => cookieName;

export const requireAuth: RequestHandler = async (req, res, next) => {
  try {
    const token = getCookie(req.headers.cookie, cookieName);

    if (!token) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    const payload = verifyAdminToken(token);
    const admin = await findSafeAdminById(payload.sub);

    if (!admin) {
      res.status(401).json({ success: false, message: "Authentication required" });
      return;
    }

    req.admin = admin;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Authentication required" });
  }
};
