export type Locale = "fa" | "en";

export interface LocalizedString {
  fa: string;
  en: string;
}

export interface MediaReference {
  url: string;
  key?: string;
  alt?: LocalizedString;
}

export interface ListQuery {
  page: number;
  limit: number;
  sort: string;
  order: 1 | -1;
  search?: string;
  visible?: boolean;
}

export interface StorageProvider {
  save(input: { filename: string; mimeType: string; data: Buffer; extension?: string }): Promise<{ key: string; url: string; size: number }>;
  remove(key: string): Promise<void>;
}
