import { Elysia } from "elysia";
import "dotenv/config";
import { addDirectoryToElysia } from "delb-file-router";

const app = new Elysia();

export interface Capsule { }

addDirectoryToElysia<Capsule>(app, {
  directory: "api",
  capsule: {},
});

app.listen(4000, () => {
  console.log("🚀 Server is running on http://localhost:4000");
});
