/** Antelope account name. Length 1..12. Charset a-z and 1-5. */
export const MAX_NAME_LEN = 12;
const NAME_RE = /^[a-z1-5]{1,12}$/;

export function assertName(name: string): string {
  if (typeof name !== "string" || !NAME_RE.test(name)) throw new Error("bad name");
  return name;
}

export function isName(name: unknown): name is string {
  return typeof name === "string" && NAME_RE.test(name);
}
