/** Absolute unix window [start, end). End exclusive. uint32 span. */
export const MAX_UNIX = (1n << 32n) - 1n;
export const MAX_SPAN_SEC = 31_536_000n;

export type Window = { start: bigint; end: bigint };

function assertUnix(n: bigint, label: string): void {
  if (typeof n !== "bigint" || n < 0n) throw new Error(`bad ${label}`);
  if (n > MAX_UNIX) throw new Error(`${label} overflows uint32`);
}

export function openWindow(start: bigint, end: bigint): Window {
  assertUnix(start, "start");
  assertUnix(end, "end");
  if (end <= start) throw new Error("empty window");
  if (end - start > MAX_SPAN_SEC) throw new Error("span too long");
  return { start, end };
}

export function assertInside(window: Window, now: bigint): void {
  assertUnix(now, "now");
  if (now < window.start) throw new Error("too early");
  if (now >= window.end) throw new Error("expired");
}
