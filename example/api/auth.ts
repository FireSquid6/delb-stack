import { sessions, users } from "../db/schema";
import { db } from "../db";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan, generateId } from "lucia";
import { isValidEmail } from "../lib/validators";
import { Argon2id } from "oslo/password";
import { insertUser } from "./crud";

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
