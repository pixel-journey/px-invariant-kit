/**
 * Worked action: allowlisted, time-windowed, nonce-sequenced call.
 * Chains allowlist, absolute window, monotonic nonce, and per-account cooldown.
 * Educational. Not wasm. Not require_auth.
 *
 * State writes happen only after pure gates pass. Cooldown is checked before
 * the nonce is consumed so a "too soon" attempt does not burn a sequence number.
 */
import { openList, grant, enter, type Allowlist } from "../src/allowlist.ts";
import { openWindow, assertInside, type Window } from "../src/window.ts";
import { openNonceBook, consume, expected, type NonceBook } from "../src/nonce.ts";
import { openClock, tryAct, type Clock } from "../src/cooldown.ts";
import { assertName } from "../src/name.ts";

export type SequencedDesk = {
  list: Allowlist;
  window: Window;
  nonces: NonceBook;
  clock: Clock;
  calls: number;
};

export function openDesk(
  admin: string,
  start: bigint,
  end: bigint,
  cooldownSec: number,
): SequencedDesk {
  return {
    list: openList(admin),
    window: openWindow(start, end),
    nonces: openNonceBook(),
    clock: openClock(cooldownSec),
    calls: 0,
  };
}

export function adminGrant(desk: SequencedDesk, caller: string, account: string): void {
  grant(desk.list, caller, account);
}

/** Refuse cooldown without mutating the clock. */
function assertCooldownReady(clock: Clock, account: string, nowTs: bigint): void {
  assertName(account);
  if (typeof nowTs !== "bigint" || nowTs < 0n) throw new Error("bad now");
  const prev = clock.last.get(account);
  if (prev === undefined) return;
  if (nowTs < prev) throw new Error("clock went backwards");
  if (nowTs < prev + BigInt(clock.cooldownSec)) throw new Error("cooldown");
}

/**
 * Perform one sequenced action.
 * Order: allowlist → window → cooldown gate → nonce consume → cooldown record.
 */
export function act(
  desk: SequencedDesk,
  caller: string,
  now: bigint,
  nonce: bigint,
): { nextNonce: bigint; readyAt: bigint; calls: number } {
  assertName(caller);
  enter(desk.list, caller);
  assertInside(desk.window, now);
  assertCooldownReady(desk.clock, caller, now);
  const nextNonce = consume(desk.nonces, caller, nonce);
  const readyAt = tryAct(desk.clock, caller, now);
  desk.calls += 1;
  return { nextNonce, readyAt, calls: desk.calls };
}

export function peekExpected(desk: SequencedDesk, account: string): bigint {
  return expected(desk.nonces, account);
}
