# Tips — invariant kit

## Repository policy

- New gate → `src/<name>.ts` + one flow assertion. **Never** a new org repo for one check.  
- Frozen micros point here via [MAP.md](MAP.md); extend the kit, do not unfreeze micros for tiny deltas.

## Ordering rules that prevent half-writes

1. Prefer **pure checks** (name, window, allowlist, quantity) before **state writes** (nonce, seen, latch).  
2. Among writes, order so a failure cannot leave half-advanced resources — e.g. **cooldown before nonce** so "too soon" does not burn the sequence number.  
3. Trip latch / mark seen only after auth and economic checks pass.

## Product constants

- **PXJ is always precision 8** in this org; the quantity module encodes that.  
- Name charset here is strict (`a-z1-5` without `.`). If an older frozen micro allowed `.`, the **kit wins** for new work.

## Common mistakes

1. Opening `px-my-new-assert` instead of adding a module.  
2. Advancing nonce then failing cooldown (sequence burned).  
3. Treating string `auth.ts` as on-chain `require_auth`.  
4. Allowing WAX or PXJ@4 through a PXJ@8 gate.  
5. Assuming admin is already on the allowlist without an explicit grant.  
6. Teaching end-inclusive windows when the kit uses `[start, end)`.

## Nice-to-have extensions (add modules, not repos)

| Idea | Where |
| --- | --- |
| Min/max stake band | `src/` + gated-drop assertion |
| Per-account daily cap | compose cap-counter with account key |
| Memo action allowlist | pair with [memo router](https://github.com/pixel-journey/px-memo-action-router) |
| Pause bit | pair with [pausable guard](https://github.com/pixel-journey/px-token-pausable-emergency-guard) |

```bash
npm test   # all three flows
```

## Related reading

[MODULES.md](MODULES.md) · [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) · [MAP.md](MAP.md) · [LEARNING-PATH](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/LEARNING-PATH.md)
