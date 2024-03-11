import { describe, expect, it } from "bun:test";
import { getPathnameFromFilepath } from "./index";
import { startServer } from "./example-server";

describe("getPathnameFromFilepath", () => {
  it("should return the pathname from a filepath", () => {
    const filepath = "/api/path/to/file.ts";
    const result = getPathnameFromFilepath(filepath, "api");
    expect(result).toBe("/path/to/file");
  });
  it("deals with index files", () => {
    const filepath = "/path/to/index.ts";
    const result = getPathnameFromFilepath(filepath, "");
    expect(result).toBe("/path/to");
  });
  it("still works if there is no .ts", () => {
    const filepath = "/path/to/index";
    const result = getPathnameFromFilepath(filepath, "");
    expect(result).toBe("/path/to");
  });
  it("still works if there is no leading slash", () => {
    const filepath = "path/to/index";
    const result = getPathnameFromFilepath(filepath, "");
    expect(result).toBe("/path/to");
  });
  it("uses a starting route", () => {
    const filepath = "path/to/filepath.ts";
    const startingRoute = "start/api";
    const result = getPathnameFromFilepath(filepath, "", startingRoute);
    expect(result).toBe("/start/api/path/to/filepath");
  });
});

describe("example server", () => {
  // TODO: use the : stuff
  // TODO: accesses capsule
  it("works properly", async () => {
    const port = 4090;
    const url = `http://localhost:${port}`;
    startServer(port);

    const result = await fetch(`${url}/`);
    console.log(await result.json());
  });
});
