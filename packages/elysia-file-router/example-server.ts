import { Elysia } from "elysia";
import { fileRouter } from ".";

export interface TestCapsule {
  name: string;
  description: string;
}

export function startServer(port: number) {
  const app = new Elysia();
  app.use(
    fileRouter({
      directory: "./example",
    }),
  );

  app.listen(port);
}
