import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { openBook, claim } from "./claim.ts";

const pxj = (amount: bigint) => ({ amount, symbol: "PXJ", precision: 8 });

describe("claim flow", () => {
  it("pays once and then refuses a second claim", () => {
    const book = openBook("alice", 60);
    assert.equal(claim(book, "alice", pxj(1_00000000n), 1_700_000_000n), 1_00000000n);
    assert.throws(() => claim(book, "alice", pxj(1n), 1_700_000_100n), /already set/);
    assert.equal(book.paid, 1_00000000n);
  });

  it("refuses the wrong caller, a bad symbol, and a non-name", () => {
    const book = openBook("alice", 60);
    assert.throws(() => claim(book, "bob", pxj(1n), 1n), /missing auth/);
    assert.throws(
      () => claim(book, "alice", { amount: 1n, symbol: "WAX", precision: 8 }, 1n),
      /want PXJ/,
    );
    assert.throws(() => openBook("Alice", 60), /bad name/);
    assert.throws(
      () => claim(book, "alice", { amount: 1n, symbol: "PXJ", precision: 4 }, 1n),
      /PXJ precision/,
    );
  });

  it("still enforces cooldown if the latch is not the only gate", () => {
    const book = openBook("alice", 60);
    book.latch.set = false;
    claim(book, "alice", pxj(1n), 100n);
    book.latch.set = false;
    assert.throws(() => claim(book, "alice", pxj(1n), 120n), /cooldown/);
    book.latch.set = false;
    assert.equal(claim(book, "alice", pxj(2n), 160n), 3n);
  });
});
