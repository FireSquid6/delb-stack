import type { Context } from "elysia";
import { auth } from "./auth";

export async function newSession(
  userId: string,
  _: Context /*The context may be needed in the future*/,
): Promise<string> {
  const session = await auth.createSession(userId, {
    ip_country: "US",
  });

  return session.id;
}

export async function deleteSession(sessionId: string) {
  await auth.invalidateSession(sessionId);
}
