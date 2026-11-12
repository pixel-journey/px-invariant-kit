/** Per-account monotonic replay nonce. First expected is 0. */
import { assertName } from "./name.ts";

export const MAX_ACCOUNTS = 64;
export const MAX_NONCE = (1n << 64n) - 1n;

export type NonceBook = Map<string, bigint>;

export function openNonceBook(): NonceBook {
  return new Map();
}

export function expected(book: NonceBook, account: string): bigint {
  assertName(account);
  return book.get(account) ?? 0n;
}

export function consume(book: NonceBook, account: string, nonce: bigint): bigint {
  assertName(account);
  if (typeof nonce !== "bigint" || nonce < 0n) throw new Error("bad nonce");
  if (nonce > MAX_NONCE) throw new Error("nonce overflow");
  const want = book.get(account);
  if (want === undefined && book.size >= MAX_ACCOUNTS) throw new Error("account cap");
  const next = want ?? 0n;
  if (nonce < next) throw new Error("replay");
  if (nonce > next) throw new Error("skipped nonce");
  if (next === MAX_NONCE) throw new Error("nonce exhausted");
  const stored = nonce + 1n;
  book.set(account, stored);
  return stored;
}
