import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one dad joke, told out loud, punchline at the end.
const JOKE =
  "I bought a calendar that tells dad jokes. The punchlines are always a month late.";

// The gate: entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace. Fail loudly instead of writing an invalid entry.
function validateJoke(joke: string): void {
  if (joke.trim().length === 0) {
    throw new Error("joke must not be only whitespace");
  }
  if (joke.length > 200) {
    throw new Error(`joke is ${joke.length} characters, over the 200 limit`);
  }
}

validateJoke(JOKE);

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  process.env.MAKEFUN_BOT_DIR ??
  "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
console.log(`Wrote entry.txt (${JOKE.length} characters)`);
