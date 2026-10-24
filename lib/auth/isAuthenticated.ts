import { getSession } from "./getSession";

export async function isAuthenticated() {
  const session = await getSession();
  return session.isAuthenticated;
}
