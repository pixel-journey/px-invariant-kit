# Official and primary sources

Prefer these over secondary blog posts when a claim about chain behaviour matters.

## WAX

- [docs.wax.io](https://docs.wax.io/) — WAX developer documentation (accounts, actions, resources, guides).
- [WAX GitHub org](https://github.com/worldwide-asset-exchange) — system contracts and tooling mirrors used by the network.

## Antelope (protocol layer)

- [docs.eosnetwork.com](https://docs.eosnetwork.com/) — protocol, smart contract model, `name`, permissions.
- [AntelopeIO/cdt](https://github.com/AntelopeIO/cdt) — C++ contract development toolkit (compile to wasm).
- [AntelopeIO/leap](https://github.com/AntelopeIO/leap) — node software.

## AtomicAssets

- [pinknetworkx/atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) — **source of truth** for collection, schema, template, asset, and `setassetdata`.
- Community API docs (cross-check against the contract): [docs.atomicassets.io](https://docs.atomicassets.io/).

## Tokens / quantity shape

- Reference token patterns in historical [eosio.contracts](https://github.com/eosio/eosio.contracts) (`eosio.token` asset + symbol layout). WAX mainnet token contracts follow the same asset encoding ideas; always verify the live ABI.

## How this kit uses them

| Kit idea | Grounded in |
| --- | --- |
| Account name charset / length | Antelope `name` rules |
| PXJ precision 8 | Project token policy (Pixel Journey); quantity encoding follows eosio-style asset |
| Time as unix seconds | `time_point_sec` / chain `now()` patterns in CDT contracts |
| Allowlist / auth patterns | `require_auth` / permission model in Antelope docs — **this kit only models the branch** |

If a flow claims something stronger than the links above support, treat that as a bug in the flow, not as chain truth.
