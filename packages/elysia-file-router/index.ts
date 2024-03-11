import { Elysia } from "elysia";
import type { Handler } from "elysia";
import fs from "fs";

interface FileRouterOptions<Capsule> {
  directory: string;
  capsule: Capsule;
  startingRoute?: string;
}

type ApiRoute<Capsule> = (capsule: Capsule) => Verbs;

interface Verbs {
  post?: Handler;
  get?: Handler;
  patch?: Handler;
  put?: Handler;
  delete?: Handler;
}

export async function addDirectory<Capsule>(
  app: Elysia,
  options: FileRouterOptions<Capsule>,
) {
  fs.readdirSync(options.directory, { recursive: true }).forEach(
    async (filepath) => {
      const module = await import(filepath as string);
      const route: ApiRoute<Capsule> = module.default as ApiRoute<Capsule>;

      const verbs = route(options.capsule);

      const pathname = getPathnameFromFilepath(
        filepath as string,
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
