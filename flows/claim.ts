/**
 * Worked action: one PXJ claim.
 * Chains name, auth, quantity, one-shot latch, cooldown, and safe add.
 * Educational. Not wasm. Not a signature check.
 */
import { requireAuth } from "../src/auth.ts";
import { assertQuantity, type Quantity } from "../src/quantity.ts";
import { trip, openLatch, type Latch } from "../src/latch.ts";
import { tryAct, openClock, type Clock } from "../src/cooldown.ts";
import { addU64 } from "../src/math.ts";

export type ClaimBook = {
  beneficiary: string;
  latch: Latch;
  clock: Clock;
  paid: bigint;
};

export function openBook(beneficiary: string, cooldownSec: number): ClaimBook {
  requireAuth(beneficiary, beneficiary);
  return {
    beneficiary,
    latch: openLatch(),
    clock: openClock(cooldownSec),
    paid: 0n,
  };
}

export function claim(book: ClaimBook, caller: string, qty: Quantity, nowTs: bigint): bigint {
  requireAuth(caller, book.beneficiary);
  assertQuantity(qty);
  if (qty.symbol !== "PXJ" || qty.precision !== 8) throw new Error("want PXJ");
  trip(book.latch);
  tryAct(book.clock, caller, nowTs);
  book.paid = addU64(book.paid, qty.amount);
  return book.paid;
}
