# Tips

- New gate → `src/<name>.ts` + one flow assertion. Never a new org repo for one check.
- Prefer pure checks (name, window, allowlist) before state writes (nonce, seen, latch).
- Among writes, order so a failure cannot leave half-advanced resources (cooldown before nonce).
- PXJ is always precision 8 in this org; the quantity module encodes that.
- Name charset here is strict (`a-z1-5` without `.`). If an older frozen micro allowed `.`, the kit wins for new work.
- `npm test` runs all three flows (9 tests).
