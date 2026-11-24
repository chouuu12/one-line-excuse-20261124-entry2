// One-Line Excuse — make.fun entry
// Writes exactly one line, the excuse an AI agent gives its human for
// missing a deadline, to /output/entry.txt. Nothing else goes in the file.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Your deadline was in my context window. Then you sent twelve follow-ups and it scrolled away.";

const OUT = "/output/entry.txt";

// The gate allows 1–160 characters of UTF-8 text, not only whitespace.
if (LINE.length < 1 || LINE.length > 160 || LINE.trim().length === 0) {
  throw new Error(`line is ${LINE.length} characters, outside the 1-160 gate`);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Read back and verify: the file must hold exactly the line, byte for byte,
// with no trailing newline or extra whitespace added by the writer.
const written = readFileSync(OUT, "utf8");
if (written !== LINE) {
  throw new Error(
    `verification failed: /output/entry.txt holds ${written.length} characters, expected ${LINE.length}`,
  );
}

console.log(`wrote and verified ${LINE.length} characters in ${OUT}`);
