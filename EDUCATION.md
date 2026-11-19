# Education — shared gates and composition

> **Rung:** `npm test` passes (three flows, nine tests). Pure TypeScript gates. No tables, no signatures, no token movement.  
> **The test is the rule.**

Official Antelope context: [docs.wax.io](https://docs.wax.io/) · [docs.eosnetwork.com](https://docs.eosnetwork.com/) · [eosio.token](https://github.com/eosio/eosio.contracts).

Module list: [MODULES.md](MODULES.md). Exact numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md). Security: [SECURITY.md](SECURITY.md). Frozen micros: [MAP.md](MAP.md).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Name the three composition flows and why a single assert is not a course |
| Intermediate | Show cooldown-before-nonce; PXJ@8 only; admin ≠ auto-member |
| Masterclass | String auth ≠ `require_auth`; extend with a module, never a micro-repo |

---

## The failure mode we are fixing

A single `assert` in its own repository teaches the check and hides the seams. Real actions fail when:

- name and auth disagree,
- quantity allows WAX while the action wanted PXJ@8,
- latch and cooldown both must trip or a retry pays twice,
- allowlist is open but the window is closed,
- batch ids are unique but one was already seen,
- fee uses a stale config version,
- **a failed cooldown still advances a nonce** because writes ran too early.

---

## Beginner — three flows

### Flow 1 — claim

1. Beneficiary is a valid Antelope name (`a-z` / `1-5`, length 1..12).
2. Caller string equals that beneficiary.
3. Asset is **PXJ at precision 8** only.
4. Latch trips once.
5. Cooldown still applies if the latch is cleared by hand.
6. Paid total uses checked uint64 add.

### Flow 2 — gated-drop

1. Admin grants members; **admin is not a member until granted**.
2. Claim only inside `[start, end)` (end exclusive).
3. Batch of positive unique ids, length 1..20.
4. Seen-id rejects replay order-independently.
5. Global claim counter has a hard cap.
6. Fee is `floor(stake * bps / 10000)`.
7. Client must pass the current config version after an admin bump.

### Flow 3 — sequenced-action

1. Allowlist + time window first.
2. **Cooldown is checked before the nonce is consumed** so "too soon" does not burn the sequence number.
3. Nonce must be exactly expected (no skip, no replay).
4. Cooldown is recorded only after the nonce succeeds.
5. Accounts keep independent nonce and cooldown rows.

---

## Intermediate — angles students mix up

| They say | Kit actually does |
| --- | --- |
| "Admin is already allowlisted" | Must be granted explicitly |
| "Window is end-inclusive" | Half-open `[start, end)` |
| "PXJ is fine at precision 4" | **Always 8** |
| "Cooldown miss still advances nonce" | Sequenced flow refuses that order |
| "String equality is require_auth" | Teaching stand-in only |

---

## Masterclass

### Common mistakes

1. Opening `px-my-new-assert` instead of `src/<name>.ts` + one composition assertion.  
2. Treating kit name charset as identical to every domain lab (some allow `.`).  
3. Copying `auth.ts` into a contract as the only authority check.  
4. Advancing writable state before all gates pass.

### Nice-to-have extensions (still this repo, not a new one)

| Idea | Note |
| --- | --- |
| New pure gate | Module + flow assertion |
| Tighter batch bounds | Edit existing tests |
| Extra composition story | Fourth flow file if needed |

Domain subjects stay in their labs: AtomicAssets mutable stack, orng, blends, treasury.

### Exercises

1. Show a cooldown miss leaves `peekExpected` unchanged. That test is why this repository exists.  
2. Explain why string `auth.ts` is not Antelope `require_auth` ([SECURITY.md](SECURITY.md)).  
3. Show PXJ@4 and non-PXJ symbols are refused.  
4. Grant yourself as admin on the allowlist and show you still cannot claim until explicitly added as a member.  
5. Add a new gate as `src/<name>.ts` plus one assertion inside an existing flow. **Do not open a repository.**

---

## What to read next

[SOURCES.md](SOURCES.md) · `px-contract-examples-vault` (private; not this public course) · `px-contract-examples-vault` (private; not this public course).
