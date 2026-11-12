/** Capped counter. Value in [0, cap]. */
export const MAX_CAP = 1_000_000;

export type Counter = { value: number; readonly cap: number };

export function openCounter(cap: number, initial = 0): Counter {
  if (!Number.isInteger(cap) || cap < 1 || cap > MAX_CAP) throw new Error("bad cap");
  if (!Number.isInteger(initial) || initial < 0 || initial > cap) throw new Error("bad initial");
  return { value: initial, cap };
}

export function inc(c: Counter): number {
  if (c.value >= c.cap) throw new Error("at cap");
  c.value += 1;
  return c.value;
}
