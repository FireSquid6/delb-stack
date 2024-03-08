import { sessions, users } from "../db/schema";
import { db } from "../db";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";

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
