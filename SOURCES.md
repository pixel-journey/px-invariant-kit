# Sources

| Source | Use |
| --- | --- |
| [docs.wax.io](https://docs.wax.io/) | WAX / Antelope actions |
| [docs.eosnetwork.com](https://docs.eosnetwork.com/) | require_auth, time, names |
| [eosio.token](https://github.com/eosio/eosio.contracts) | Quantity / transfer patterns |
| [atomicassets-contract](https://github.com/pinknetworkx/atomicassets-contract) | Domain labs own mutable rules; the kit does not |

This kit is **shared gates only**. Do not open a new repo for one assert. Domain labs still own full subjects: AtomicAssets mutable stack, orng, blends, treasury.

**Org rules the gates must not contradict:**

- **PXJ precision is always 8.**
- String equality is not `require_auth`.
- A failed early gate must not burn a later nonce or payout (composition order).

Map of modules: [MODULES.md](https://github.com/pixel-journey/px-invariant-kit/blob/main/MODULES.md) · [MAP.md](https://github.com/pixel-journey/px-invariant-kit/blob/main/MAP.md).

## Related labs

| Lab | Topic |
| --- | --- |
| [memo router](https://github.com/pixel-journey/px-memo-action-router) | Grammar, not auth |
| [pausable](https://github.com/pixel-journey/px-token-pausable-emergency-guard) | msig unpause |
| [token ledger](https://github.com/pixel-journey/px-token-balance-ledger) | Conservation |
| [HOW-TO-ADD](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/HOW-TO-ADD.md) | Where a new check goes |
