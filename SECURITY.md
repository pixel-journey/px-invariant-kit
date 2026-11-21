# Security — invariant kit

## Closed in tests (per module / flow)

| Issue | Kit mitigation |
| --- | --- |
| Wrong caller string | Equality after the name gate |
| PXJ at the wrong precision | Refused (always **8**) |
| Double claim (flow 1) | Latch |
| Rapid retry if latch cleared | Cooldown |
| Wrapped balance | `addU64` |
| Outsider on a drop | Allowlist |
| Claim outside sale window | Time window `[start, end)` |
| Replay of an asset id | Seen set |
| Duplicate ids in one tx | Batch uniqueness |
| Unlimited claims | Cap counter |
| Client on old fee rules | Config version |
| Cooldown miss burns nonce | **Sequenced flow:** cooldown checked **before** nonce |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Signatures | String equality is not `require_auth` |
| Table rows / RAM | Domain contracts own storage |
| Token / NFT movement | Domain labs + live contracts |
| Admin on allowlist | Must be granted explicitly |
| Name charset | Kit is strict (`a-z1-5`); some domain labs allow `.` |

## Attack angles the composition teaches

1. Advancing nonce then failing cooldown (sequence burned) — prevented in `sequenced-action`.  
2. Treating admin as already allowlisted without a grant.  
3. End-inclusive windows when the kit uses half-open `[start, end)`.  
4. Opening `px-my-new-assert` instead of adding a module ([MAP.md](MAP.md)).  
5. Mixing kit-strict names with domain labs that allow mid-name dots without a test.

## Honesty limits

This does not prove a signature, a table row, a token transfer, or an AtomicAssets mint. Domain repos and the live contracts in [SOURCES.md](SOURCES.md) still own those.

```bash
npm test   # three flows, nine tests
```

[docs.wax.io](https://docs.wax.io/).
