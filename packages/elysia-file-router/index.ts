import { Elysia } from "elysia";
import type { Handler } from "elysia";
import fs from "fs";
import path from "path";

interface FileRouterOptions<Capsule> {
  directory: string;
  capsule: Capsule;
  startingRoute?: string;
}

export type ApiRoute<Capsule> = (capsule: Capsule) => Verbs;

export interface Verbs {
  post?: Handler;
  get?: Handler;
  patch?: Handler;
  put?: Handler;
  delete?: Handler;
}

export async function addDirectoryToElysia<Capsule>(
  app: Elysia,
  options: FileRouterOptions<Capsule>,
) {
  fs.readdirSync(options.directory, { recursive: true }).forEach(
    async (filepath) => {
      filepath = path.join(options.directory, filepath as string);

      if (fs.statSync(filepath).isDirectory()) {
        return;
      }

      const module = require(`./${filepath}`);
      const route: ApiRoute<Capsule> = module.default as ApiRoute<Capsule>;

      const verbs = route(options.capsule);

      const pathname = getPathnameFromFilepath(
        filepath as string,
        options.directory,
        options.startingRoute ?? "",
      );

      addVerbs(app, verbs, pathname);
    },
  );
}

function addVerbs(app: Elysia, verbs: Verbs, pathname: string) {
  const names = ["post", "get", "patch", "put", "delete"];

  for (const name of names) {
    if (Object.hasOwn(verbs, name)) {
      switch (name) {
        case "post":
          app.post(pathname, verbs.post);
          break;
        case "get":
          app.get(pathname, verbs.get);
          break;
        case "patch":
          app.patch(pathname, verbs.patch);
          break;
        case "put":
          app.put(pathname, verbs.put);
          break;
        case "delete":
          app.delete(pathname, verbs.delete);
          break;
      }
    }
  }
}

export function getPathnameFromFilepath(
  filepath: string,
  apiRoute: string,
  startingRoute: string = "",
): string {
  const parts = filepath.split("/");
  while (parts[0] === "") {
    parts.shift();
  }

  parts[parts.length - 1] = parts[parts.length - 1].split(".")[0];

  if (parts[parts.length - 1] === "index") {
    parts.pop();
  }

  if (parts[0] === apiRoute) {
    parts.shift();
  }

  const startingParts = startingRoute.split("/");
  while (startingParts[0] === "") {
    startingParts.shift();
  }
  while (startingParts.length > 0) {
    const part = startingParts.pop();
    if (part === "..") {
      parts.pop();
    } else {
      parts.unshift(part ?? "");
    }
  }

  return "/" + parts.join("/");
}
