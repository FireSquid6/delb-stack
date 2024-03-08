import { Elysia } from "elysia";
import { insertUser } from "./api/crud";
import { generateId } from "lucia";
import "dotenv/config";
import { resolve } from "node:path";
import { db } from "./db/index";
import { migrate } from "drizzle-orm/libsql/migrator";

await (async () => {
  await migrate(db, { migrationsFolder: resolve(__dirname, "./migrations") });
})();

const app = new Elysia();

app.get("/new-user", () => {
  insertUser({
    id: generateId(255),
    name: "John Doe",
    email: "jdeiss06@gmail.com",
  });
});

app.listen(4000, () => {
  console.log("🚀 Server is running on http://localhost:4000");
});
