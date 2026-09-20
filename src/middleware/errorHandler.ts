import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = typeof error?.statusCode === "number" ? error.statusCode : error?.name === "ValidationError" ? 400 : error?.code === 11000 ? 409 : 500;
  const message = statusCode === 500 ? "Internal server error" : error.message;

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(statusCode === 400 && error?.errors ? { errors: error.name === "ValidationError" ? Object.fromEntries(Object.entries(error.errors).map(([key, value]) => [key, (value as { message?: string }).message])) : error.errors } : {}),
  });
};
