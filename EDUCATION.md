# Education — shared gates and composition

## The failure mode we are fixing

A single `assert` in its own repository teaches the check and hides the seams. Real actions fail when:

- name and auth disagree,
- quantity allows WAX while the action wanted PXJ@8,
- latch and cooldown both must trip or a retry pays twice,
- allowlist is open but the window is closed,
- batch ids are unique but one was already seen,
- fee uses a stale config version,
- **a failed cooldown still advances a nonce** because writes ran too early.

Module list: [MODULES.md](MODULES.md). Exact numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

## Flow 1 — claim

1. Beneficiary is a valid Antelope name (`a-z` / `1-5`, length 1..12).
2. Caller string equals that beneficiary.
3. Asset is **PXJ at precision 8** only.
4. Latch trips once.
5. Cooldown still applies if the latch is cleared by hand.
6. Paid total uses checked uint64 add.

## Flow 2 — gated-drop

1. Admin grants members; **admin is not a member until granted**.
2. Claim only inside `[start, end)` (end exclusive).
3. Batch of positive unique ids, length 1..20.
4. Seen-id rejects replay order-independently.
5. Global claim counter has a hard cap.
6. Fee is `floor(stake * bps / 10000)`.
7. Client must pass the current config version after an admin bump.

## Flow 3 — sequenced-action

1. Allowlist + time window first.
2. **Cooldown is checked before the nonce is consumed** so "too soon" does not burn the sequence number.
3. Nonce must be exactly expected (no skip, no replay).
4. Cooldown is recorded only after the nonce succeeds.
5. Accounts keep independent nonce and cooldown rows.

## Exercises

1. Show a cooldown miss leaves `peekExpected` unchanged. That test is why this repository exists.
2. Explain why string `auth.ts` is not Antelope `require_auth` ([SECURITY.md](SECURITY.md)).
3. Show PXJ@4 and non-PXJ symbols are refused.
4. Grant yourself as admin on the allowlist and show you still cannot claim until explicitly added as a member.
5. Add a new gate as `src/<name>.ts` plus one assertion inside an existing flow. **Do not open a repository.**

## What to read next

[SOURCES.md](SOURCES.md). Domain labs (AtomicAssets mutable stack, orng, blends, treasury) are separate whole subjects. Study order: [learning path](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/LEARNING-PATH.md). Frozen micros: [MAP.md](MAP.md).
