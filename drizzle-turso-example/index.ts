import { Elysia } from "elysia";
import "dotenv/config";
import { fileRouter } from "delb-file-router";
import cookie from "@elysiajs/cookie";

const app = new Elysia();

app.use(fileRouter({ directory: "./api" }));
app.use(cookie());

app.listen(4000, () => {
  console.log("🚀 Server is running on http://localhost:4000");
});

export type App = typeof app;
