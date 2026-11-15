# Education

## The failure mode we are fixing

A single `assert` in its own repository teaches the check and hides the composition. Real actions fail at the seams: the name check and the auth check disagree, the quantity allows WAX while the action wanted PXJ, the latch and the cooldown both have to trip or a retry pays twice, the allowlist is open but the window is closed, the batch is unique but one id was already seen, the fee uses the wrong config version — or a **failed cooldown still advances a nonce** because writes ran too early.

Module list: [MODULES.md](MODULES.md). Worked numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

## Flow 1 — `claim`

1. Beneficiary must be a valid Antelope name.
2. Caller must be that beneficiary (string equality only).
3. Asset must be PXJ at precision 8.
4. Latch trips once.
5. Cooldown still applies if the latch is cleared by hand.
6. Paid total uses checked uint64 add.

## Flow 2 — `gated-drop`

1. Admin grants members; admin is not a member until granted.
2. Claim only inside `[start, end)`.
3. Caller must be on the list.
4. Batch of asset ids must be non-empty, unique, length ≤ 20.
5. Each id is marked seen; a second mark is a replay.
6. Global claim counter has a hard cap.
7. Fee is floor(stake * bps / 10000).
8. Client must pass the current config version after an admin bump.

## Flow 3 — `sequenced-action`

1. Allowlist + time window first (pure membership and time).
2. **Cooldown is checked before the nonce is consumed** so "too soon" does not burn the sequence number.
3. Nonce must be exactly the expected value (no skip, no replay).
4. Cooldown is recorded only after the nonce succeeds.
5. Accounts keep independent nonce and cooldown rows.

This is the lesson about **gate order**: pure checks before state writes; among writes, prefer not to advance one resource if a later gate will fail.

## Exercises

1. In `sequenced-action`, show a cooldown miss leaves the expected nonce unchanged. That is the test that justifies this repository.
2. Explain why string `auth.ts` is not Antelope `require_auth` ([SECURITY.md](SECURITY.md)).
3. Show a PXJ quantity at precision 4 is refused, and a non-PXJ symbol is refused.
4. Grant yourself as admin on the allowlist and show you still cannot claim until you are explicitly added.
5. Add a new gate as `src/<name>.ts` plus one assertion inside an existing flow. Do not open a repository.

## What to read next

Official links live in [SOURCES.md](SOURCES.md). Domain labs (AtomicAssets mutable stack, orng, blends, treasury) are separate repositories because they are whole subjects, not single checks. Study order: [learning path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/LEARNING-PATH.md).
