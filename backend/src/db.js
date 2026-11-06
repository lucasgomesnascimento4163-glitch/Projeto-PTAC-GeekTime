import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OBRAS_DB_PATH = join(__dirname, "data.json");

async function readJsonFile(filePath) {
  try {
    const rawData = await readFile(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeJsonFile(filePath, data) {
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function readObras() {
  return readJsonFile(OBRAS_DB_PATH);
}

export async function writeObras(obras) {
  await writeJsonFile(OBRAS_DB_PATH, obras);
}
