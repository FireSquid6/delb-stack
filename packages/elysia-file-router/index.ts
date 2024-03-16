import chalk from "chalk";
import { Elysia } from "elysia";
import type { Handler } from "elysia";
import fs from "fs";
import path from "path";

interface FileRouterOptions {
  directory: string;
  startingRoute?: string;
  disableOutput?: boolean;
}

export type ApiRoute = () => Verbs;

export interface Verbs {
  post?: Handler;
  get?: Handler;
  patch?: Handler;
  put?: Handler;
  delete?: Handler;
}

export async function fileRouter(options: FileRouterOptions): Promise<Elysia> {
  const app = new Elysia();
  console.log(chalk.bold("Adding Routes"));
  fs.readdirSync(options.directory, { recursive: true }).forEach(
    async (filepath) => {
      filepath = path.join(options.directory, filepath as string);

      if (fs.statSync(filepath).isDirectory()) {
        return;
      }

      const module = require(path.join(process.cwd(), `./${filepath}`));
      const route: ApiRoute = module.default as ApiRoute;

      const verbs = route();

      const pathname = getPathnameFromFilepath(
        filepath as string,
        options.directory,
        options.startingRoute ?? "",
      );

      const added = addVerbs(app, verbs, pathname);

      let outputString = "";
      outputString += chalk.bold.yellow(pathname);
      outputString += " --> ";
      for (const verb of added) {
        outputString += chalk.blue(verb) + " ";
      }

      if (options.disableOutput !== true) {
        console.log(outputString);
      }
    },
  );

  return Promise.resolve(app);
}

function addVerbs(app: Elysia, verbs: Verbs, pathname: string): string[] {
  const names = ["get", "post", "patch", "put", "delete"];
  const added = [];

  for (const name of names) {
    if (Object.hasOwn(verbs, name)) {
      added.push(name.toUpperCase());
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

  return added;
}

export function getPathnameFromFilepath(
  filepath: string,
  apiRoute: string,
  startingRoute: string = "",
): string {
  const parts = filepath.split("/");
  while (parts[0] === "" || parts[0] === ".") {
    parts.shift();
  }

  parts[parts.length - 1] = parts[parts.length - 1].split(".")[0];

  if (parts[parts.length - 1] === "index") {
    parts.pop();
  }

  const apiParts = apiRoute.split("/");
  while (apiParts[0] === "" || apiParts[0] === ".") {
    apiParts.shift();
  }

  for (let i = 0; i < apiParts.length; i++) {
    parts.shift();
  }

  const startingParts = startingRoute.split("/");
  while (startingParts[0] === "" || startingParts[0] === ".") {
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

  const pathname = path.join("/" + parts.join("/"));
  return pathname;
}
