import type { RequestHandler } from "express";
import { HttpError, cleanObject, isLocalizedString, isNonEmptyString, isValidDate, isValidEmail, isValidUrl } from "../utils/http";

type Resource = "hero" | "profile" | "experience" | "service" | "technology" | "language" | "project" | "resume" | "contactMethod" | "contactMessage";
const fields: Record<Resource, readonly string[]> = {
  hero: ["jobTitle", "headline", "description", "primaryCta", "primaryCtaUrl", "isVisible"],
  profile: ["name", "bio", "location", "availability", "email"],
  experience: ["company", "role", "description", "startDate", "endDate", "current", "order", "isVisible"],
  service: ["title", "description", "icon", "order", "isVisible"],
  technology: ["name", "category", "icon", "proficiency", "order", "isVisible"],
  language: ["name", "level", "order", "isVisible"],
  project: ["title", "slug", "shortDescription", "description", "technologies", "liveUrl", "repositoryUrl", "featured", "order", "isVisible"],
  resume: ["title"],
  contactMethod: ["type", "label", "value", "url", "icon", "order", "isVisible"],
  contactMessage: ["name", "email", "subject", "message", "locale"],
};

const localized = (body: Record<string, unknown>, name: string, required: boolean, errors: Record<string, string>) => {
  if (body[name] === undefined && !required) return;
  if (!isLocalizedString(body[name])) errors[name] = `${name} must contain only fa and en string values`;
};

export const validateResource = (resource: Resource, partial = false): RequestHandler => (req, _res, next) => {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const required = (name: string) => !partial || body[name] !== undefined;
  const stringField = (name: string, must = false) => { if ((must || body[name] !== undefined) && !isNonEmptyString(body[name])) errors[name] = `${name} must be a non-empty string`; };
  const localizedFields: Record<Resource, string[]> = { hero: ["jobTitle", "headline", "description", "primaryCta"], profile: ["name", "bio", "location", "availability"], experience: ["role", "description"], service: ["title", "description"], technology: ["name"], language: ["name", "level"], project: ["title", "shortDescription", "description"], resume: ["title"], contactMethod: ["label"], contactMessage: [] };
  for (const name of localizedFields[resource]) localized(body, name, required(name) && !["description", "location", "availability", "primaryCta", "shortDescription", "title"].includes(name), errors);
  if (resource === "hero") { if (required("jobTitle") && body.jobTitle === undefined) errors.jobTitle = "jobTitle is required"; if (required("headline") && body.headline === undefined) errors.headline = "headline is required"; if (body.primaryCtaUrl !== undefined && body.primaryCtaUrl !== null && !isValidUrl(body.primaryCtaUrl)) errors.primaryCtaUrl = "primaryCtaUrl must be an http(s) URL"; }
  if (resource === "profile" && body.email !== undefined && body.email !== null && !isValidEmail(body.email)) errors.email = "email must be valid";
  if (resource === "experience") { stringField("company", required("company")); if (body.startDate !== undefined && !isValidDate(body.startDate)) errors.startDate = "startDate must be a valid date"; if (required("startDate") && body.startDate === undefined) errors.startDate = "startDate is required"; if (body.endDate !== undefined && body.endDate !== null && !isValidDate(body.endDate)) errors.endDate = "endDate must be a valid date"; if (body.current !== undefined && typeof body.current !== "boolean") errors.current = "current must be boolean"; if (body.current === false && body.endDate === undefined && !partial) errors.endDate = "endDate is required when current is false"; if (isValidDate(body.startDate) && isValidDate(body.endDate) && new Date(body.endDate).getTime() < new Date(body.startDate).getTime()) errors.endDate = "endDate cannot precede startDate"; }
  if (resource === "service" && required("description") && body.description === undefined) errors.description = "description is required";
  if (resource === "technology" && body.proficiency !== undefined && (typeof body.proficiency !== "number" || body.proficiency < 0 || body.proficiency > 100)) errors.proficiency = "proficiency must be a number between 0 and 100";
  for (const name of ["isVisible", "featured"]) if (body[name] !== undefined && typeof body[name] !== "boolean") errors[name] = `${name} must be boolean`;
  if (["experience", "service", "technology", "language", "contactMethod", "project"].includes(resource) && body.order !== undefined && (!Number.isInteger(body.order) || (body.order as number) < 0)) errors.order = "order must be a non-negative integer";
  if (resource === "project") { stringField("slug", required("slug")); if (body.liveUrl !== undefined && body.liveUrl !== null && !isValidUrl(body.liveUrl)) errors.liveUrl = "liveUrl must be an http(s) URL"; if (body.repositoryUrl !== undefined && body.repositoryUrl !== null && !isValidUrl(body.repositoryUrl)) errors.repositoryUrl = "repositoryUrl must be an http(s) URL"; if (body.technologies !== undefined && (!Array.isArray(body.technologies) || body.technologies.some((item) => !isNonEmptyString(item)))) errors.technologies = "technologies must be an array of strings"; }
  if (resource === "contactMethod") { stringField("type", true); stringField("value", true); if (body.url !== undefined && body.url !== null && !isValidUrl(body.url)) errors.url = "url must be an http(s) URL"; if (body.type === "email" && !isValidEmail(body.value)) errors.value = "email contact methods require a valid email value"; }
  if (resource === "contactMessage") { stringField("name", true); stringField("message", true); if (!isValidEmail(body.email)) errors.email = "email must be valid"; if (body.subject !== undefined && body.subject !== null && !isNonEmptyString(body.subject)) errors.subject = "subject must be a string"; if (body.locale !== undefined && body.locale !== "fa" && body.locale !== "en") errors.locale = "locale must be fa or en"; }
  if (Object.keys(errors).length) { const error = new HttpError(400, "Validation failed"); (error as Error & { errors?: Record<string, string> }).errors = errors; next(error); return; }
  req.body = cleanObject(body, fields[resource]);
  next();
};

export const validateContactMessage = validateResource("contactMessage");
