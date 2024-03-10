import { Elysia } from "elysia";
import "dotenv/config";

const app = new Elysia();

app.get("/signup", () => { });

app.listen(4000, () => {
  console.log("🚀 Server is running on http://localhost:4000");
});
