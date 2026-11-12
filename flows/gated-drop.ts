/**
 * Worked action: allowlisted drop inside a time window.
 * Chains allowlist, time window, unique batch ids, seen-set, claim cap,
 * optional fee in bps, and a monotonic config version.
 * Educational. Not wasm. Not AtomicAssets mint.
 */
import { openList, grant, enter, type Allowlist } from "../src/allowlist.ts";
import { openWindow, assertInside, type Window } from "../src/window.ts";
import { assertBatch } from "../src/batch.ts";
import { openSeenBook, mark, type SeenBook } from "../src/seen.ts";
import { openCounter, inc, type Counter } from "../src/counter.ts";
import { assertBps, applyBps } from "../src/bps.ts";
import { openVersion, bump, type ConfigVersion } from "../src/version.ts";
import { assertName } from "../src/name.ts";

export type Drop = {
  list: Allowlist;
  window: Window;
  seen: SeenBook;
  claims: Counter;
  feeBps: number;
  feesCollected: bigint;
  cfg: ConfigVersion;
};

export function openDrop(
  admin: string,
  start: bigint,
  end: bigint,
  maxClaims: number,
  feeBps: number,
): Drop {
  return {
    list: openList(admin),
    window: openWindow(start, end),
    seen: openSeenBook(),
    claims: openCounter(maxClaims),
    feeBps: assertBps(feeBps),
    feesCollected: 0n,
    cfg: openVersion(0n),
  };
}

export function adminGrant(drop: Drop, caller: string, account: string): void {
  grant(drop.list, caller, account);
}

export function adminBumpConfig(drop: Drop, caller: string, next: bigint): bigint {
  assertName(caller);
  if (caller !== drop.list.admin) throw new Error("not admin");
  return bump(drop.cfg, next);
}

/**
 * Claim a batch of unique asset ids during the window.
 * Each id is marked seen. One claim increments the global claim counter.
 * Fee is floor(gross * feeBps / 10000) units of an abstract stake.
 */
export function claimDrop(
  drop: Drop,
  caller: string,
  now: bigint,
  assetIds: readonly bigint[],
  stake: bigint,
  configVersion: bigint,
): { fee: bigint; remaining: bigint; claimNumber: number } {
  enter(drop.list, caller);
  assertInside(drop.window, now);
  if (configVersion !== drop.cfg.version) throw new Error("stale config");
  const ids = assertBatch(assetIds);
  for (const id of ids) mark(drop.seen, id);
  if (typeof stake !== "bigint" || stake < 0n) throw new Error("bad stake");
  const fee = applyBps(stake, drop.feeBps);
  drop.feesCollected += fee;
  const claimNumber = inc(drop.claims);
  return { fee, remaining: stake - fee, claimNumber };
}
