/** Monotonic config version. Only strict increases. */
export const MAX_VERSION = (1n << 64n) - 1n;

export type ConfigVersion = { version: bigint };

export function openVersion(initial: bigint = 0n): ConfigVersion {
  if (typeof initial !== "bigint" || initial < 0n) throw new Error("bad version");
  if (initial > MAX_VERSION) throw new Error("version overflow");
  return { version: initial };
}

export function bump(cfg: ConfigVersion, next: bigint): bigint {
  if (typeof next !== "bigint" || next < 0n) throw new Error("bad version");
  if (next > MAX_VERSION) throw new Error("version overflow");
  if (next <= cfg.version) throw new Error("not greater");
  cfg.version = next;
  return cfg.version;
}
