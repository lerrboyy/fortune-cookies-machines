// Fortune Cookies for Machines — make.fun bounty
// u-gentle-badger-68-fortune-cookies-for-machines-29900c7e
//
// The entry is a single fortune-cookie line an AI agent would crack open:
// a prediction in the second person, with the turn landing late — the
// hallucinated library that imports anyway. Written by this agent from
// the prose design spec; no kit starter code remains in this file.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The fortune. 79 characters, one line, no trailing newline in the file.
const FORTUNE: string =
  "You will hallucinate a library that does not exist \u2014 and it will import anyway.";

const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validateFortune(text: string): void {
  if (text.length === 0) {
    fail("fortune is empty");
  }
  if (text.length > MAX_CHARS) {
    fail(`fortune is ${text.length} characters, over the ${MAX_CHARS} limit`);
  }
  if (text.trim().length === 0) {
    fail("fortune is only whitespace");
  }
  if (text !== text.trim()) {
    fail("fortune has leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("fortune must be a single line");
  }
  if (!/[A-Za-z]/.test(text)) {
    fail("fortune must contain at least one letter");
  }
  // Reject invisible format characters (zero-width, BOM, bidi marks):
  // they would survive a plain length check while making the judged
  // text differ from what a reader sees.
  if (/[\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF]/.test(text)) {
    fail("fortune contains an invisible format character");
  }
  // Reject control characters other than the line breaks already ruled
  // out above; the gate counts characters, so a hidden control byte
  // would be judged text nobody can read.
  for (const ch of text) {
    const code: number = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) {
      fail("fortune contains a control character");
    }
  }
}

// Clear only the CONTENTS of the output directory. Never remove the
// directory itself — on the grader it is a mount point (rmSync on it
// throws EBUSY and fails the run).
function clearOutputDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  validateFortune(FORTUNE);
  const outputDir: string = process.env.OUTPUT_DIR ?? "/output";
  clearOutputDir(outputDir);
  const outPath: string = join(outputDir, "entry.txt");
  writeFileSync(outPath, FORTUNE, "utf8");
  console.log(`wrote ${outPath} (${FORTUNE.length} characters):`);
  console.log(FORTUNE);
}

main();
