# px-invariant-kit

> **Trust:** private educational kit (Tier B)
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

One repo for the small checks that do not deserve their own repository, plus **worked flows** that compose them the way a real action does.

A new pure gate or small helper lands **here** under `src/`, then gets exercised by a flow under `flows/`. Do not open `px-<one-check>` for it.

**Real code:** `npm test` (**9 tests**, three flows). **Not** wasm. **Not** chain signature verification.

---

## Why this exists

A name check alone is a remark. A claim that needs a valid name, matching auth, PXJ at precision 8, a one-shot latch, a cooldown, **and** overflow-safe add is a lesson.

Same idea for the drop and sequenced flows: the seams are where contracts fail — including **check order** (a failed cooldown must not burn a nonce).

---

## Modules (`src/`)

| Module | Check |
| --- | --- |
| `name.ts` | Antelope name, `a-z1-5`, length 1..12 |
| `auth.ts` | Caller string equals expected account |
| `math.ts` | uint64 add/sub; overflow and underflow refused |
| `quantity.ts` | Asset amount, symbol, precision; **PXJ locked to 8** |
| `range.ts` | Closed integer range |
| `hex.ts` | Lowercase even-length hex |
| `latch.ts` | One-shot flag |
| `cooldown.ts` | Per-account unix cooldown |
| `nonce.ts` | Monotonic per-account replay nonce |
| `allowlist.ts` | Admin grant/revoke; admin not implied member |
| `window.ts` | Absolute `[start, end)` unix window |
| `seen.ts` | Order-independent seen-id set |
| `batch.ts` | Unique positive ids, length 1..20 |
| `counter.ts` | Capped counter |
| `bps.ts` | 0..10000 inclusive; floor apply |
| `version.ts` | Monotonic config version |

## Flows (`flows/`)

| Flow | Composes |
| --- | --- |
| `claim.ts` | name, auth, quantity, latch, cooldown, safe add |
| `gated-drop.ts` | allowlist, window, batch, seen, counter, bps, config version |
| `sequenced-action.ts` | allowlist, window, **cooldown before nonce**, nonce |

```bash
npm test
```

## Official sources

See [SOURCES.md](SOURCES.md). Primary anchors: [docs.wax.io](https://docs.wax.io/), [docs.eosnetwork.com](https://docs.eosnetwork.com/), [AtomicAssets contract](https://github.com/pinknetworkx/atomicassets-contract), [CDT](https://github.com/AntelopeIO/cdt).

## Frozen micro-repos

See [MAP.md](MAP.md). History only. Do not extend them.

## Not done

No wasm. `requireAuth` compares strings. Domain subjects stay in domain repos.
