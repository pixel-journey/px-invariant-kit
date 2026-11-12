import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { openDrop, adminGrant, adminBumpConfig, claimDrop } from "./gated-drop.ts";

describe("gated-drop flow", () => {
  it("runs a full allowlisted claim inside the window", () => {
    const drop = openDrop("admin", 100n, 200n, 5, 500);
    adminGrant(drop, "admin", "alice");
    const out = claimDrop(drop, "alice", 150n, [1n, 2n], 10_000n, 0n);
    assert.equal(out.fee, 500n);
    assert.equal(out.remaining, 9_500n);
    assert.equal(out.claimNumber, 1);
    assert.equal(drop.feesCollected, 500n);
  });

  it("refuses outsider, too early, duplicate id, and claim over the cap", () => {
    const drop = openDrop("admin", 100n, 200n, 1, 0);
    adminGrant(drop, "admin", "alice");
    assert.throws(() => claimDrop(drop, "bob", 150n, [1n], 0n, 0n), /not allowed/);
    assert.throws(() => claimDrop(drop, "alice", 50n, [1n], 0n, 0n), /too early/);
    claimDrop(drop, "alice", 150n, [1n], 0n, 0n);
    assert.throws(() => claimDrop(drop, "alice", 160n, [1n], 0n, 0n), /replay/);
    assert.throws(() => claimDrop(drop, "alice", 160n, [2n], 0n, 0n), /at cap/);
  });

  it("refuses a stale config version after an admin bump", () => {
    const drop = openDrop("admin", 100n, 200n, 5, 0);
    adminGrant(drop, "admin", "alice");
    adminBumpConfig(drop, "admin", 3n);
    assert.throws(() => claimDrop(drop, "alice", 150n, [1n], 0n, 0n), /stale config/);
    const out = claimDrop(drop, "alice", 150n, [1n], 0n, 3n);
    assert.equal(out.claimNumber, 1);
  });
});
