import { Elysia } from "elysia";
import fs from "fs";

interface FileRouterOptions<Capsule> {
  directory: string;
  capsule: Capsule;
  route?: string;
}

export function addDirectory<Capsule>(
  app: Elysia,
  options: FileRouterOptions<Capsule>,
) {
  fs.readdirSync(options.directory, { recursive: true }).forEach(
    (filepath) => { },
  );
}
