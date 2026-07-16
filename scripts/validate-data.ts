#!/usr/bin/env tsx
/*
 * Standalone validation script (runs via `npm run validate`).
 * Loads data.json, parses it through the Zod schema, and prints a friendly
 * success/failure summary. Useful in CI before triggering a Vercel deploy.
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { PortfolioSchema } from "../lib/schema";

function main() {
  const path = resolve(process.cwd(), "data.json");
  const raw = JSON.parse(readFileSync(path, "utf-8"));
  const result = PortfolioSchema.safeParse(raw);

  if (!result.success) {
    console.error("\n  data.json validation FAILED\n");
    for (const issue of result.error.issues) {
      console.error(`  • ${issue.path.join(".") || "<root>"} → ${issue.message}`);
    }
    process.exit(1);
  }

  const data = result.data;
  console.log("\n  data.json validation OK\n");
  console.log(`  name      : ${data.name}`);
  console.log(`  tagline   : ${data.tagline}`);
  console.log(`  projects  : ${data.projects.length}`);
  console.log(`  socials   : ${data.socials.length}`);
  console.log(`  theme     : ${data.theme}\n`);
}

main();
