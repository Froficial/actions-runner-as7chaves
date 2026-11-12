import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { completionPercent, isSyntheticPath } from "../src/progress.mjs";

describe("original synthetic progress function", () => {
  it("returns 0 for an empty training path", () => assert.equal(completionPercent(0, 0), 0));
  it("returns 0 for a path not started", () => assert.equal(completionPercent(0, 4), 0));
  it("returns 50 for two of four fictional lessons", () => assert.equal(completionPercent(2, 4), 50));
  it("rounds a partial percentage", () => assert.equal(completionPercent(2, 3), 67));
  it("returns 100 when all fictional lessons finish", () => assert.equal(completionPercent(4, 4), 100));
  for (const invalid of [[-1, 3], [4, 3], [2, -1]]) {
    it("rejects impossible counts " + JSON.stringify(invalid), () => {
      assert.throws(() => completionPercent(...invalid), RangeError);
    });
  }
  for (const invalid of [[0.5, 4], [0, "4"], [Infinity, 4]]) {
    it("rejects invalid number types " + JSON.stringify(invalid), () => {
      assert.throws(() => completionPercent(...invalid), TypeError);
    });
  }
});

describe("synthetic fixtures, no private data", () => {
  const fixtures = JSON.parse(readFileSync(fileURLToPath(new URL("../fixtures/paths.json", import.meta.url)), "utf8"));

  it("all scenarios are explicitly fictional", () => {
    assert.ok(fixtures.length > 0);
    assert.ok(fixtures.every(isSyntheticPath));
  });

  it("each fixture progress is deterministic", () => {
    const computed = fixtures.map((path) => completionPercent(
      path.lessons.filter((lesson) => lesson.completed).length,
      path.lessons.length
    ));
    assert.deepEqual(computed, [0, 50, 100]);
  });

  it("rejects a fixture without fictional ID", () => {
    assert.equal(isSyntheticPath({ id: "real-user", lessons: [] }), false);
  });
});
