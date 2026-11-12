/** Basis points. 0..10000 inclusive. 10000 = 100%. */
export const MAX_BPS = 10_000;

export function assertBps(rate: number | bigint): number {
  if (typeof rate === "bigint") {
    if (rate < 0n || rate > BigInt(MAX_BPS)) throw new Error("bad bps");
    return Number(rate);
  }
  if (typeof rate !== "number" || !Number.isInteger(rate)) throw new Error("bad bps");
  if (rate < 0 || rate > MAX_BPS) throw new Error("bad bps");
  return rate;
}

/** Floor of amount * rate / 10000. */
export function applyBps(amount: bigint, rate: number | bigint): bigint {
  if (typeof amount !== "bigint" || amount < 0n) throw new Error("bad amount");
  return (amount * BigInt(assertBps(rate))) / 10_000n;
}
