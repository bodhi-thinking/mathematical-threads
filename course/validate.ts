/**
 * Build-time content check. Server-only: it reads the filesystem.
 * Called from generateStaticParams, so a malformed journey fails `next build`
 * with a clear message instead of crashing in a learner's browser.
 */
import fs from "node:fs";
import path from "node:path";
import { validateJourney } from "../lib/validate-journey";
import { journeys } from "./index";

function publicFileExists(publicPath: string): boolean {
  const relative = publicPath.replace(/^\/+/, "");
  const absolute = path.join(process.cwd(), "public", relative);
  return fs.existsSync(absolute);
}

export function assertJourneysValid(): void {
  const problems: string[] = [];

  const ids = journeys.map((journey) => journey.meta.id);
  const dupes = ids.filter((id, index) => ids.indexOf(id) !== index);
  for (const dupe of new Set(dupes)) {
    problems.push(`Duplicate journey id in course/index.ts: "${dupe}".`);
  }

  for (const journey of journeys) {
    problems.push(...validateJourney(journey, { assetExists: publicFileExists }));
  }

  if (problems.length > 0) {
    throw new Error(
      `Journey content problems:\n${problems.map((problem) => `  • ${problem}`).join("\n")}`,
    );
  }
}
