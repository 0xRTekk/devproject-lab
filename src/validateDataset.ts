import fs from "fs";

import { briefSchema, type ProjectBrief } from "./schema/brief.js";

// --- 3️⃣ Validation du dataset ---
const DATASET_PATH = "src/briefs_dataset.json";

try {
  const raw = fs.readFileSync(DATASET_PATH, "utf-8");
  const briefs: unknown = JSON.parse(raw);

  if (!Array.isArray(briefs)) {
    throw new Error("Dataset must be an array of briefs");
  }

  console.log(`🧩 Validating ${briefs.length} briefs...\n`);

  let validCount = 0;
  let errorCount = 0;

  briefs.forEach((brief, index) => {
    const result = briefSchema.safeParse(brief);
    if (result.success) {
      validCount++;
    } else {
      errorCount++;
      console.error(`❌ Brief #${index + 1} failed validation:`);
      console.error(result.error.format());
      console.log("");
    }
  });

  console.log(`✅ ${validCount} briefs valid`);
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} briefs invalid`);
    process.exit(1);
  } else {
    console.log("🎉 All briefs passed validation!");
  }
} catch (err) {
  console.error("❌ Error reading or parsing dataset:", err);
  process.exit(1);
}
