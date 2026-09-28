import dotenv from "dotenv";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve from this file instead of process.cwd(), which can differ when a
// watcher or process manager starts the server.
const configDirectory = dirname(fileURLToPath(import.meta.url));
dotenv.config({
  path: resolve(configDirectory, "../../.env"),
  override: true,
  quiet: true,
});

const port = Number(process.env.PORT ?? 5000);

export const env = {
  hindsightBaseUrl:
    process.env.HINDSIGHT_BASE_URL ?? "https://api.hindsight.vectorize.io",
  hindsightApiKey: process.env.HINDSIGHT_API_KEY,
  hindsightBankId: process.env.HINDSIGHT_BANK_ID ?? "incidentmind",
  groqApiKey: process.env.GROQ_API_KEY,
  port: Number.isInteger(port) && port > 0 ? port : 5000,
};
