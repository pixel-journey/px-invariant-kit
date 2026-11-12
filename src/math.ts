/** Overflow-safe uint64 add and sub. */
export const MAX_U64 = (1n << 64n) - 1n;

function assertU64(n: bigint, label: string): void {
  if (typeof n !== "bigint" || n < 0n || n > MAX_U64) throw new Error(`bad ${label}`);
}

export function addU64(a: bigint, b: bigint): bigint {
  assertU64(a, "a");
  assertU64(b, "b");
  if (a > MAX_U64 - b) throw new Error("add overflow");
  return a + b;
}

export function subU64(a: bigint, b: bigint): bigint {
  assertU64(a, "a");
  assertU64(b, "b");
  if (b > a) throw new Error("sub underflow");
  return a - b;
}
