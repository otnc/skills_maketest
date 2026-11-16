import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const validator = fileURLToPath(new URL("../scripts/validate.mjs", import.meta.url));

function validateFixture(t, markdown) {
  const skillsDirectory = mkdtempSync(join(tmpdir(), "maketest validator "));
  const skillDirectory = join(skillsDirectory, "sample-skill");
  const skillFile = join(skillDirectory, "SKILL.md");
  t.after(() => {
    if (markdown !== undefined) {
      unlinkSync(skillFile);
      rmdirSync(skillDirectory);
    }
    rmdirSync(skillsDirectory);
  });
  if (markdown !== undefined) {
    mkdirSync(skillDirectory);
    writeFileSync(skillFile, markdown);
  }
  const result = spawnSync(process.execPath, [validator, skillsDirectory], { encoding: "utf8" });
  assert.ifError(result.error);
  return result;
}

test("accepts a multiline description in a skill with matching directory name", (t) => {
  const result = validateFixture(t, [
    "---",
    "name: sample-skill",
    "description: >-",
    "  Verify price calculations.",
    "  料金の計算を確かめる。",
    "---",
    "Run the focused pricing tests.",
  ].join("\r\n"));
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Valid: skills\/sample-skill\/SKILL\.md/);
});

test("rejects a name that would not match the installed directory", (t) => {
  const result = validateFixture(t, "---\nname: another-skill\ndescription: Check pricing.\n---\nRun the pricing tests.\n");
  assert.equal(result.status, 1);
  assert.match(result.stderr, /name must match the directory name "sample-skill"/);
});

test("rejects a directory with no publishable skills", (t) => {
  const result = validateFixture(t);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Add at least one skill/);
});
