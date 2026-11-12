# Education

## The failure mode we are fixing

A single `assert` in its own repository teaches the check and hides the composition. Real actions fail at the seams: the name check and the auth check disagree, the quantity allows WAX while the action wanted PXJ, the latch and the cooldown both have to trip or a retry pays twice, the allowlist is open but the window is closed, the batch is unique but one id was already seen, the fee uses the wrong config version.

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

## What to read next

Official links live in [SOURCES.md](SOURCES.md). Domain labs (AtomicAssets mutable stack, orng, blends) are separate repositories because they are whole subjects, not single checks.
