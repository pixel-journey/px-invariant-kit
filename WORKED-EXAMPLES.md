# Worked examples — invariant kit flows

Nine tests across three flows. **PXJ precision is always 8.**

## Flow 1 — claim

Valid name + matching caller + PXJ@8 + first latch trip + cooldown ok → paid increases with safe add. Second claim on same latch refused. Wrong symbol/precision refused.

## Flow 2 — gated-drop

Admin grants member. Claim only inside `[start, end)`. Unique batch ids ≤ 20. Seen-id rejects replay. Counter stops at cap. Fee uses floor bps. Stale config version refused after admin bump.

## Flow 3 — sequenced-action (gate order)

Order: allowlist → window → **cooldown check** → nonce consume → cooldown record.

| Attempt | Result |
| --- | --- |
| Cooldown not ready | refused; **expected nonce unchanged** |
| Wrong nonce | refused |
| Happy path | nonce advances; readyAt set |

Independent accounts keep separate nonce and cooldown rows.

## Module smoke (imported by flows)

Names, auth strings, uint64 math, quantity, range, hex, latch, allowlist, window, seen, batch, counter, bps, version — all exercised through the flows rather than isolated micro-repos.
