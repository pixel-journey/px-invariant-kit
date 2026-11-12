/** One-shot flag. No reset. */
export type Latch = { set: boolean };
export function openLatch(): Latch {
  return { set: false };
}
export function trip(l: Latch): void {
  if (l.set) throw new Error("already set");
  l.set = true;
}
