# Shared contract gates and composition flows

> **Domain:** reusable Antelope/WAX invariants  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Vault:** the private index `px-contract-examples-vault` (private; not this public course) is not the course. This repository is.

One kit for small checks that must not be solo repos, plus **worked flows** that compose them the way a real action does — including **gate order** (cooldown before nonce).

**Code under test:** `npm test` (**9 tests**, three flows). Not wasm. Auth is string equality only. **PXJ precision is always 8.**

## Learning materials

| Doc | Role |
| --- | --- |
| [MODULES.md](MODULES.md) | Every gate, one table |
| [EDUCATION.md](EDUCATION.md) | Why composition matters |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Exact claim / drop / sequenced numbers |
| [TIPS.md](TIPS.md) | Where new gates land |
| [MAP.md](MAP.md) | Frozen micro-repos (do not extend) |
| [SECURITY.md](SECURITY.md) | Limits of string auth |
| [SOURCES.md](SOURCES.md) | Official anchors |

## Modules (`src/`)

name · auth · math · quantity (**PXJ@8**) · range · hex · latch · cooldown · nonce · allowlist · window · seen · batch · counter · bps · version

## Flows (`flows/`)

| Flow | Lesson |
| --- | --- |
| `claim` | name + auth + PXJ@8 + latch + cooldown + safe add |
| `gated-drop` | allowlist + window + batch + seen + cap + bps + config version |
| `sequenced-action` | cooldown checked **before** nonce consume |

```bash
npm test
```

MIT — Pixel Journey
