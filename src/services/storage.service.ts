import { createWriteStream } from "node:fs";
import { mkdir, unlink } from "node:fs/promises";
import { join, basename } from "node:path";
import { randomUUID } from "node:crypto";
import type { StorageProvider } from "../types/content";

const uploadDirectory = join(process.cwd(), "uploads");

class LocalStorageProvider implements StorageProvider {
  async save(input: { filename: string; mimeType: string; data: Buffer; extension?: string }) {
    await mkdir(uploadDirectory, { recursive: true });
    const extension = input.extension ?? "";
    const key = `${randomUUID()}${extension}`;
    const path = join(uploadDirectory, key);
    await new Promise<void>((resolve, reject) => {
      const stream = createWriteStream(path);
      stream.on("finish", resolve);
      stream.on("error", reject);
      stream.end(input.data);
    });
    return { key, url: `/uploads/${key}`, size: input.data.byteLength };
  }

  async remove(key: string) {
    const safeKey = basename(key);
    if (safeKey !== key || !safeKey) return;
    await unlink(join(uploadDirectory, safeKey)).catch(() => undefined);
  }
}

export const storageProvider: StorageProvider = new LocalStorageProvider();
