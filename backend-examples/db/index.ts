import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";

const client = createClient({
  url: process.env.CONNECTION_URL!,
  authToken: process.env.AUTH_TOKEN!,
});

export const db = drizzle(client);
