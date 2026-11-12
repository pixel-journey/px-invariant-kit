/** Closed integer range. */
export function assertInRange(value: number, min: number, max: number, label = "value"): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) throw new Error("bad bounds");
  if (min > max) throw new Error("inverted bounds");
  if (typeof value !== "number" || !Number.isInteger(value)) throw new Error(`bad ${label}`);
  if (value < min || value > max) throw new Error(`${label} out of range`);
  return value;
}
