# Module catalog

Each file under `src/` is one gate. **Do not** open a repository for a new row in this table. Add the file here and call it from a flow in `flows/`.

Auth in this kit is **string equality**, not a chain signature. Amounts that can hit `2^62` or `2^64` use `bigint`.

**PXJ precision is always 8.**

| Module | Rule the tests care about | Where it is composed |
| --- | --- | --- |
| `name.ts` | Account name: charset `a-z` and `1-5`, length 1..12 | All flows |
| `auth.ts` | Caller string equals the expected account, or is in an any-of list | `flows/claim.ts` |
| `math.ts` | `uint64` add/sub; overflow and underflow refused | `flows/claim.ts` |
| `quantity.ts` | Positive asset amount, symbol, precision 0..18; **PXJ locked to 8** | `flows/claim.ts` |
| `range.ts` | Integer inside a closed `[min, max]`; endpoints allowed | Available to flows |
| `hex.ts` | Lowercase even-length hex | Available to flows |
| `latch.ts` | One-shot flag: first trip sets, second is `already set` | `flows/claim.ts` |
| `cooldown.ts` | Per-account unix cooldown; backwards clock refused | `flows/claim.ts`, `flows/sequenced-action.ts` |
| `nonce.ts` | Monotonic per-account nonce; no skip, no replay | `flows/sequenced-action.ts` |
| `allowlist.ts` | Admin grant/revoke; **admin is not a member until granted** | `flows/gated-drop.ts`, `flows/sequenced-action.ts` |
| `window.ts` | Absolute unix window `[start, end)`; end is exclusive | Both drop and sequenced |
| `seen.ts` | Order-independent id set; second mark is a replay | `flows/gated-drop.ts` |
| `batch.ts` | Unique positive ids, length 1..20, order kept | `flows/gated-drop.ts` |
| `counter.ts` | Increment until a fixed cap, then refuse | `flows/gated-drop.ts` |
| `bps.ts` | Rate in `[0, 10000]`; `apply` floors `amount * rate / 10000` | `flows/gated-drop.ts` |
| `version.ts` | Config version only moves strictly upward | `flows/gated-drop.ts` |

## Gate order (the part a single module cannot teach)

`flows/sequenced-action.ts` checks **cooldown before it consumes the nonce**. A "too soon" attempt must leave the expected nonce unchanged. That is the reason these modules share a repository.

## Frozen duplicates

Sixteen older repos still contain the same ideas in isolation. They are history. Map: [MAP.md](MAP.md). Policy: [FREEZE.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/FREEZE.md).

Name rules in this kit are **stricter** than some of those repos (no `.` in names for cooldown, nonce, and allowlist). If they disagree, **this kit wins** for new work.
