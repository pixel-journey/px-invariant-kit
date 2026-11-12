/** Per-account unix-second cooldown. First action is free. */
import { assertName } from "./name.ts";

export const MAX_ACCOUNTS = 64;
export type Clock = { cooldownSec: number; last: Map<string, bigint> };

export function openClock(cooldownSec: number): Clock {
  if (!Number.isInteger(cooldownSec) || cooldownSec < 1 || cooldownSec > 86_400) {
    throw new Error("bad cooldown");
  }
  return { cooldownSec, last: new Map() };
}

export function tryAct(clock: Clock, account: string, nowTs: bigint): bigint {
  assertName(account);
  if (typeof nowTs !== "bigint" || nowTs < 0n) throw new Error("bad now");
  const prev = clock.last.get(account);
  if (prev === undefined) {
    if (clock.last.size >= MAX_ACCOUNTS) throw new Error("account cap");
  } else {
    if (nowTs < prev) throw new Error("clock went backwards");
    if (nowTs < prev + BigInt(clock.cooldownSec)) throw new Error("cooldown");
  }
  clock.last.set(account, nowTs);
  return nowTs + BigInt(clock.cooldownSec);
}
