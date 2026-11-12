# Education

A single `assert` in its own repository teaches the check and hides the composition. Real actions fail at the seams: the name check and the auth check disagree, the quantity allows WAX while the action wanted PXJ, the latch and the cooldown both have to trip or a retry pays twice.

`flows/claim.ts` is the small version of that seam.

1. The beneficiary must already be a valid name.
2. The caller must be that beneficiary.
3. The asset must be PXJ at precision 8.
4. The latch trips once. A second claim dies even if the cooldown has elapsed.
5. The cooldown still applies if a caller resets the latch by hand. That is deliberate: one gate is not the other.
6. The paid total uses checked uint64 add.
