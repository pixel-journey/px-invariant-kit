import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { openDesk, adminGrant, act, peekExpected } from "./sequenced-action.ts";

describe("sequenced-action flow", () => {
  it("runs two sequential nonces inside the window for a member", () => {
    const desk = openDesk("admin", 100n, 500n, 10);
    adminGrant(desk, "admin", "alice");
    assert.equal(peekExpected(desk, "alice"), 0n);
    const a = act(desk, "alice", 150n, 0n);
    assert.equal(a.nextNonce, 1n);
    assert.equal(a.calls, 1);
    const b = act(desk, "alice", 170n, 1n);
    assert.equal(b.nextNonce, 2n);
    assert.equal(b.calls, 2);
  });

  it("refuses outsider, too early, wrong nonce, and cooldown", () => {
    const desk = openDesk("admin", 100n, 500n, 60);
    adminGrant(desk, "admin", "alice");
    assert.throws(() => act(desk, "bob", 150n, 0n), /not allowed/);
    assert.throws(() => act(desk, "alice", 50n, 0n), /too early/);
    act(desk, "alice", 150n, 0n);
    assert.throws(() => act(desk, "alice", 180n, 1n), /cooldown/);
    assert.equal(peekExpected(desk, "alice"), 1n);
    assert.throws(() => act(desk, "alice", 220n, 0n), /replay/);
    assert.throws(() => act(desk, "alice", 220n, 2n), /skipped nonce/);
    const ok = act(desk, "alice", 220n, 1n);
    assert.equal(ok.nextNonce, 2n);
  });

  it("keeps accounts independent on nonce and cooldown", () => {
    const desk = openDesk("admin", 100n, 500n, 30);
    adminGrant(desk, "admin", "alice");
    adminGrant(desk, "admin", "bob");
    act(desk, "alice", 150n, 0n);
    const bob = act(desk, "bob", 155n, 0n);
    assert.equal(bob.nextNonce, 1n);
    assert.equal(peekExpected(desk, "alice"), 1n);
    assert.equal(peekExpected(desk, "bob"), 1n);
  });
});
