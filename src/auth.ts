import { assertName } from "./name.ts";

/** String-equality stand-in for require_auth. Not a signature check. */
export function requireAuth(caller: string, expected: string): void {
  assertName(caller);
  assertName(expected);
  if (caller !== expected) throw new Error("missing auth");
}
