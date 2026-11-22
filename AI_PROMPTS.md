# AI handoff — invariant kit

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [MODULES.md](https://github.com/pixel-journey/px-invariant-kit/blob/main/MODULES.md) | Gate map |
| [MAP.md](https://github.com/pixel-journey/px-invariant-kit/blob/main/MAP.md) | Where checks live |
| Domain labs | Own full subjects (AA, orng, blend, treasury) |

## Non-negotiables

1. This kit is **shared gates only**. Do not open a new repo for one assert.
2. Domain labs still own full subjects: AtomicAssets mutable stack, orng, blends, treasury.
3. **PXJ precision is always 8** — gates must not contradict that.
4. String equality is **not** `require_auth`.
5. A failed early gate must not burn a later nonce or payout (composition order).
6. Name rules here may be stricter than some domain labs (e.g. no `.`) — do not merge without a test.

## Prompt seeds

- "Add a quantity gate here vs opening a micro-repo — which?"
- "Show composition order: early fail leaves later nonce unburned."
- "Refuse treating string caller match as require_auth."
- "Point mutable wipe rules at the AA stack, not a new kit module."

## Do not

- Spawn a micro-repo for a renamed assert.
- Put full setassetdata / orng job tables into the kit.
- Soften PXJ@8 for convenience.
