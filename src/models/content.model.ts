import { Schema, model, type Document } from "mongoose";

const localizedString = new Schema({ fa: { type: String, default: "" }, en: { type: String, default: "" } }, { _id: false });
const mediaReference = new Schema({ url: { type: String, required: true }, key: String, alt: { type: localizedString, required: false } }, { _id: false });

const baseOptions: any = { timestamps: true, versionKey: false };

export const HeroModel: any = model("Hero", new Schema({
  key: { type: String, unique: true, default: "default" },
  jobTitle: { type: localizedString, required: true },
  headline: { type: localizedString, required: true },
  description: { type: localizedString, default: () => ({ fa: "", en: "" }) },
  image: mediaReference,
  primaryCta: localizedString,
  primaryCtaUrl: String,
  isVisible: { type: Boolean, default: true },
}, baseOptions));

export const ProfileModel: any = model("Profile", new Schema({
  key: { type: String, unique: true, default: "default" },
  name: { type: localizedString, required: true },
  bio: { type: localizedString, required: true },
  location: localizedString,
  availability: localizedString,
  image: mediaReference,
  email: String,
}, baseOptions));

export const ExperienceModel: any = model("Experience", new Schema({
  company: { type: String, required: true, trim: true },
  role: { type: localizedString, required: true },
  description: localizedString,
  startDate: { type: Date, required: true },
  endDate: Date,
  current: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, baseOptions));

export const ServiceModel: any = model("Service", new Schema({
  title: { type: localizedString, required: true },
  description: { type: localizedString, required: true },
  icon: String,
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, baseOptions));

export const TechnologyModel: any = model("Technology", new Schema({
  name: { type: localizedString, required: true },
  category: String,
  icon: String,
  proficiency: { type: Number, min: 0, max: 100 },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, baseOptions));

export const LanguageModel: any = model("Language", new Schema({
  name: { type: localizedString, required: true },
  level: { type: localizedString, required: true },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, baseOptions));

export const ProjectModel: any = model("Project", new Schema({
  title: { type: localizedString, required: true },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  shortDescription: localizedString,
  description: localizedString,
  technologies: { type: [String], default: [] },
  images: { type: [mediaReference], default: [] },
  liveUrl: String,
  repositoryUrl: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, baseOptions));

export const ResumeModel: any = model("Resume", new Schema({
  key: { type: String, unique: true, default: "default" },
  title: localizedString,
  file: { type: mediaReference, default: null },
  updatedBy: String,
}, baseOptions));

export const ContactMethodModel: any = model("ContactMethod", new Schema({
  type: { type: String, required: true, enum: ["email", "phone", "telegram", "linkedin", "github", "location", "website", "other"], trim: true },
  label: { type: localizedString, required: true },
  value: { type: String, required: true },
  url: String,
  icon: String,
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, baseOptions));

export const ContactMessageModel: any = model("ContactMessage", new Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true },
  subject: { type: String, trim: true, maxlength: 200 },
  message: { type: String, required: true, maxlength: 5000 },
  locale: { type: String, enum: ["fa", "en"], default: "en" },
  status: { type: String, enum: ["new", "read", "replied", "archived"], default: "new" },
  readAt: Date,
}, baseOptions));

export type ContentDocument = Document & Record<string, unknown>;
