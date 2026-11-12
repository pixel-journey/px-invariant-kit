/** One-shot batch of unique positive ids. Not a persistent seen set. */
export const MAX_BATCH = 20;
export const MAX_ID = (1n << 64n) - 1n;

function assertId(id: bigint): void {
  if (typeof id !== "bigint" || id < 1n) throw new Error("bad id");
  if (id > MAX_ID) throw new Error("id overflow");
}

export function assertBatch(ids: readonly bigint[]): bigint[] {
  if (!Array.isArray(ids) || ids.length === 0) throw new Error("empty batch");
  if (ids.length > MAX_BATCH) throw new Error("batch too large");
  const seen = new Set<bigint>();
  const out: bigint[] = [];
  for (const id of ids) {
    assertId(id);
    if (seen.has(id)) throw new Error("duplicate id");
    seen.add(id);
    out.push(id);
  }
  return out;
}
