/** Order-independent seen-id set. First mark only. */
export const MAX_IDS = 64;
export const MAX_ID = (1n << 64n) - 1n;

export type SeenBook = Set<bigint>;

export function openSeenBook(): SeenBook {
  return new Set();
}

function assertId(id: bigint): void {
  if (typeof id !== "bigint" || id < 1n) throw new Error("bad id");
  if (id > MAX_ID) throw new Error("id overflow");
}

export function mark(book: SeenBook, id: bigint): true {
  assertId(id);
  if (book.has(id)) throw new Error("replay");
  if (book.size >= MAX_IDS) throw new Error("id cap");
  book.add(id);
  return true;
}
