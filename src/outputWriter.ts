import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, '../output');

export async function writeBriefsToFile(data: unknown): Promise<string> {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `briefs-${timestamp}.json`;
  const filePath = path.join(OUTPUT_DIR, filename);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');

  return filePath;
}
