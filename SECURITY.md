# Security notes

| Issue | Kit mitigation |
| --- | --- |
| Wrong caller string | Equality after the name gate |
| PXJ at the wrong precision | Refused |
| Double claim (flow 1) | Latch |
| Rapid retry if latch cleared | Cooldown |
| Wrapped balance | `addU64` |
| Outsider on a drop | Allowlist |
| Claim outside sale window | Time window |
| Replay of an asset id | Seen set |
| Duplicate ids in one tx | Batch uniqueness |
| Unlimited claims | Cap counter |
| Client on old fee rules | Config version |

This does not prove a signature, a table row, a token transfer, or an AtomicAssets mint. Domain repos and the live contracts in [SOURCES.md](SOURCES.md) still own those.
