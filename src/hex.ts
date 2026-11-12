/** Lowercase even-length hex. Default length 8..64. */
const HEX_RE = /^[0-9a-f]+$/;
export function assertHex(hex: string, minLen = 8, maxLen = 64): string {
  if (!Number.isInteger(minLen) || !Number.isInteger(maxLen) || minLen < 2) throw new Error("bad bounds");
  if (minLen > maxLen) throw new Error("inverted bounds");
  if (minLen % 2 !== 0 || maxLen % 2 !== 0) throw new Error("odd bounds");
  if (typeof hex !== "string") throw new Error("bad hex");
  if (hex.length % 2 !== 0) throw new Error("odd length");
  if (hex.length < minLen || hex.length > maxLen) throw new Error("hex length");
  if (!HEX_RE.test(hex)) throw new Error("bad charset");
  return hex;
}
