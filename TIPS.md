# Tips — shared gates

- Put new pure helpers in `src/` and exercise them from a `flows/` story.
- **Do not** open `px-<one-check>` for a single assert (see [MAP.md](MAP.md)).
- Gate order: pure checks before writes; among writes, avoid burning a nonce if cooldown will fail.
- Domain subjects (AtomicAssets, orng, blends) stay in domain repos.
