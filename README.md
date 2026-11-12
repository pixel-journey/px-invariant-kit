# px-invariant-kit

> **Trust:** private educational kit (Tier B)
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

One repo for the small checks that do not deserve their own repository.

A new invariant that is a pure gate or a small stateful helper lands **here**, as a module under `src/`, and is then used by a flow under `flows/`. Do not open `px-<one-check>` for it.

**Real code:** `npm test` (3 tests on the claim flow). **Not** wasm. **Not** a signature check.

---

## What is in the box

| Module | Check |
| --- | --- |
| `src/name.ts` | Antelope name, `a-z1-5`, length 1..12 |
| `src/auth.ts` | Caller string must equal the expected account |
| `src/math.ts` | uint64 add/sub, overflow and underflow refused |
| `src/quantity.ts` | Asset amount, symbol, precision; PXJ locked to 8 |
| `src/range.ts` | Closed integer range |
| `src/hex.ts` | Lowercase even-length hex |
| `src/latch.ts` | One-shot flag |
| `src/cooldown.ts` | Per-account unix cooldown |
| `flows/claim.ts` | Those checks composed into one PXJ claim |

The claim flow is the point. Name, auth, PXJ precision, a one-shot latch, a cooldown, and a safe add have to agree before `paid` moves.

```bash
npm test
```

## Where the old micro-repos sit

See [MAP.md](MAP.md). They stay as history. Do not extend them.

## Not done

No wasm. `requireAuth` compares strings; it does not check a chain signature. Domain repos (blends, orng, staking, the token ledger) stay their own repos — this kit is the shared layer they should import ideas from, not a replacement for those flows.
