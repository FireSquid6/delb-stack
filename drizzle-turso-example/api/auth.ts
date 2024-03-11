import { sessions, users } from "../db/schema";
import { db } from "../db";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan, generateId } from "lucia";
import { isValidEmail } from "../lib/validators";
import { Argon2id } from "oslo/password";
import { findUserWithEmail, findUserWithId, insertUser } from "./crud";

const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

export const auth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(4, "w"),
  getSessionAttributes: (attributes) => {
    return {
      ipCountry: attributes.ip_country,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof auth;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
  interface DatabaseSessionAttributes {
    ip_country: string;
  }
}

export async function createUser(
  name: string,
  email: string,
  password: string,
) {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email");
  }

  const hashedPassword = await new Argon2id().hash(password);
  const id = generateId(15);

  try {
    await insertUser({
      name,
      id,
      email,
      hashedPassword,
    });
  } catch (error) {
    throw error;
  }
}

export async function loginUserWithPassword(email: string, password: string) {
  if (!isValidEmail(email)) {
    throw new Error("Invalid email");
  }

  let id = "";
  let hashedPassword = "";
  try {
    const user = await findUserWithEmail(email);
    id = user.id;
    hashedPassword = user.hashedPassword;
  } catch (error) {
    // if there is no user that is fine
    id = "blahblahblahrandomstuff";
    hashedPassword = "blahblahblahrandomstuff";
  }

  const validPassword = await new Argon2id().verify(hashedPassword, password);
  if (!validPassword) {
    return Promise.reject(new Error("Invalid password or email"));
  }

  const session = await auth.createSession(id, {
    ip_country: "US", // todo: actually get this from the request
  });

  return Promise.resolve(session);
}
