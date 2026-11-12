/** Asset quantity. PXJ is locked to precision 8. */
export const MAX_AMOUNT = (1n << 62n) - 1n;
const SYMBOL_RE = /^[A-Z]{1,7}$/;

export type Quantity = { amount: bigint; symbol: string; precision: number };

export function assertQuantity(q: Quantity): void {
  if (typeof q.amount !== "bigint" || q.amount < 1n || q.amount > MAX_AMOUNT) throw new Error("bad amount");
  if (typeof q.symbol !== "string" || !SYMBOL_RE.test(q.symbol)) throw new Error("bad symbol");
  if (!Number.isInteger(q.precision) || q.precision < 0 || q.precision > 18) throw new Error("bad precision");
  if (q.symbol === "PXJ" && q.precision !== 8) throw new Error("PXJ precision");
}
