export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const isLocalizedString = (value: unknown): boolean => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return Object.keys(candidate).every((key) => key === "fa" || key === "en") && typeof candidate.fa === "string" && typeof candidate.en === "string";
};

export const isValidEmail = (value: unknown): value is string =>
  typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

export const isValidUrl = (value: unknown): value is string => {
  if (typeof value !== "string" || value.length > 2048) return false;
  try { const url = new URL(value); return url.protocol === "http:" || url.protocol === "https:"; } catch { return false; }
};

export const isValidDate = (value: unknown): value is string | Date => {
  if (!(typeof value === "string" || value instanceof Date)) return false;
  return !Number.isNaN(new Date(value).getTime());
};

export const cleanObject = (body: Record<string, unknown>, fields: readonly string[]) =>
  Object.fromEntries(fields.filter((field) => Object.prototype.hasOwnProperty.call(body, field)).map((field) => [field, body[field]]));

export const parseBoolean = (value: unknown): boolean | undefined => {
  if (value === undefined) return undefined;
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return undefined;
};

export const parseListQuery = (query: Record<string, unknown>) => ({
  page: Math.max(1, Number(query.page) || 1),
  limit: Math.min(100, Math.max(1, Number(query.limit) || 20)),
  sort: typeof query.sort === "string" ? query.sort : "order",
  order: query.order === "desc" ? -1 as const : 1 as const,
  search: typeof query.search === "string" && query.search.trim() ? query.search.trim() : undefined,
  visible: parseBoolean(query.visible),
});
