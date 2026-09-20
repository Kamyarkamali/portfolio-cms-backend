import express from "express";
import cors from "cors";
import { join } from "node:path";
import { config } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFound";
import { authRouter } from "./routes/auth.routes";
import healthRouter from "./routes/health.routes";
import { adminRouter, publicRouter } from "./routes/content.routes";

const app = express();

app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json({ limit: "12mb" }));
app.use("/uploads", express.static(join(process.cwd(), "uploads"), { fallthrough: false }));

app.use("/api", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/public", publicRouter);
app.use("/api/admin", adminRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
