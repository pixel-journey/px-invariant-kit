/** Admin-managed allowlist. Admin is not a member until granted. */
import { assertName } from "./name.ts";

export const MAX_MEMBERS = 32;

export type Allowlist = { admin: string; members: Set<string> };

export function openList(admin: string): Allowlist {
  assertName(admin);
  return { admin, members: new Set() };
}

export function isMember(list: Allowlist, account: string): boolean {
  assertName(account);
  return list.members.has(account);
}

export function enter(list: Allowlist, account: string): void {
  if (!isMember(list, account)) throw new Error("not allowed");
}

export function grant(list: Allowlist, caller: string, account: string): void {
  assertName(caller);
  assertName(account);
  if (caller !== list.admin) throw new Error("not admin");
  if (list.members.has(account)) throw new Error("already member");
  if (list.members.size >= MAX_MEMBERS) throw new Error("member cap");
  list.members.add(account);
}

export function revoke(list: Allowlist, caller: string, account: string): void {
  assertName(caller);
  assertName(account);
  if (caller !== list.admin) throw new Error("not admin");
  if (!list.members.has(account)) throw new Error("not a member");
  list.members.delete(account);
}
