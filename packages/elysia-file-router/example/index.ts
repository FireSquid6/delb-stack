import type { TestCapsule } from "../index.test";
import type { ApiRoute } from "..";

const rootFilepath: ApiRoute<TestCapsule> = () => {
  return {
    get: () => {
      return "Hello world"!;
    },
  };
};

export default rootFilepath;
