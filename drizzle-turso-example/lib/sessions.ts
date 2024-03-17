import { auth } from "./auth";

export async function newSession(userId: string): Promise<string> {
  const session = await auth.createSession(userId, {
    ip_country: "US",
  });

  const cookie = auth.createSessionCookie(session.id);
  return cookie.serialize();
}

export async function deleteSession(sessionId: string) {
  await auth.invalidateSession(sessionId);
}
