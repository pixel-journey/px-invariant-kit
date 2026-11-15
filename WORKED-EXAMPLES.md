# Worked examples — invariant kit flows

Nine tests across three flows. **PXJ precision is always 8.** Auth is string equality only.

## Flow 1 — claim

`openBook("alice", cooldownSec 60)`.

| Call | Result |
| --- | --- |
| claim alice, `1_00000000n` PXJ@8, t=`1_700_000_000` | returns `1_00000000n`, book.paid same |
| second claim any amount later | `already set` (latch); paid unchanged |
| caller bob | `missing auth` |
| symbol WAX | `want PXJ` |
| PXJ precision 4 | `PXJ precision` |
| openBook `"Alice"` | `bad name` |

Cooldown/cooldown interaction (latch cleared by hand for the test):

1. claim at t=100 amount 1 → ok.
2. latch cleared; claim at t=120 → `cooldown`.
3. latch cleared; claim at t=160 amount 2 → returns **3** (paid 1+2).

## Flow 2 — gated-drop

`openDrop(admin, start 100, end 200, cap 5, feeBps 500)`.

Happy path: grant alice; claim at t=150, ids `[1,2]`, stake `10_000`, configVer `0`:

| Field | Value |
| --- | --- |
| fee | 500 (`floor(10000 * 500 / 10000)`) |
| remaining | 9_500 |
| claimNumber | 1 |
| feesCollected | 500 |

| Refusal | Trigger |
| --- | --- |
| not allowed | bob not granted |
| too early | t=50 |
| replay | same id 1 again |
| at cap | cap 1, second distinct id after first claim |
| stale config | admin bumps to 3; claim still passes version 0 |

After bump to 3, claim with version **3** succeeds.

## Flow 3 — sequenced-action (gate order)

`openDesk(admin, start 100, end 500, cooldownSec 10)` then grant alice.

Happy: t=150 nonce 0 → nextNonce 1, calls 1. t=170 nonce 1 → nextNonce 2, calls 2.

Cooldown desk (cooldown 60):

| Attempt | Result | expected nonce after |
| --- | --- | --- |
| bob | not allowed | — |
| alice t=50 | too early | 0 |
| alice t=150 nonce 0 | ok | 1 |
| alice t=180 nonce 1 | **cooldown** | **still 1** |
| alice t=220 nonce 0 | replay | 1 |
| alice t=220 nonce 2 | skipped nonce | 1 |
| alice t=220 nonce 1 | ok | 2 |

Alice and bob grant independently: each can act with nonce 0; both expected become 1.

## Why this is not sixteen repos

The cooldown miss that **keeps** the nonce is the composition lesson. Isolated micro-repos cannot show it. Frozen duplicates: [MAP.md](MAP.md).
