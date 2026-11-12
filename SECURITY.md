# Security notes

| Issue | Kit mitigation |
| --- | --- |
| Wrong caller string | Equality after the name gate |
| PXJ at the wrong precision | Refused |
| Double claim | Latch |
| Rapid retry if the latch is cleared | Cooldown |
| Wrapped balance | `addU64` |

This does not prove a signature, a table row, or a token transfer. Domain repos still own those.
