import { describe, expect, it } from "bun:test";
import { getPathnameFromFilepath } from "./index";

describe("getPathnameFromFilepath", () => {
  it("should return the pathname from a filepath", () => {
    const filepath = "/path/to/file.ts";
    const result = getPathnameFromFilepath(filepath);
    expect(result).toBe("/path/to/file");
  });
  it("deals with index files", () => {
    const filepath = "/path/to/index.ts";
    const result = getPathnameFromFilepath(filepath);
    expect(result).toBe("/path/to");
  });
  it("still works if there is no .ts", () => {
    const filepath = "/path/to/index";
    const result = getPathnameFromFilepath(filepath);
    expect(result).toBe("/path/to");
  });
  it("still works if there is no leading slash", () => {
    const filepath = "path/to/index";
    const result = getPathnameFromFilepath(filepath);
    expect(result).toBe("/path/to");
  });
  it("uses a starting route", () => {
    const filepath = "path/to/filepath.ts";
    const startingRoute = "start/api";
    const result = getPathnameFromFilepath(filepath, startingRoute);
    expect(result).toBe("/start/api/path/to/filepath");
  });
});
