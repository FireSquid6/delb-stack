import { Elysia } from "elysia";
import { addDirectoryToElysia } from ".";

export interface TestCapsule {
  name: string;
  description: string;
}

export function startServer(port: number) {
  const app = new Elysia();
  addDirectoryToElysia<TestCapsule>(app, {
    directory: "example",
    capsule: {
      name: "jon doe",
      description: "A sample description",
    },
  });

  app.listen(port);
}
