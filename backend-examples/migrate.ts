import { resolve } from "node:path";
import { db } from "./db/index";
import { migrate } from "drizzle-orm/libsql/migrator";

await (async () => {
  await migrate(db, { migrationsFolder: resolve(__dirname, "./migrations") });
})();
