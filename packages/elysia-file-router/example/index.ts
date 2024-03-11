import type { TestCapsule } from "../example-server";
import type { ApiRoute } from "..";

const thisRoute: ApiRoute<TestCapsule> = () => {
  return {
    get: () => {
      return {
        message: "Hello world!",
      };
    },
  };
};

export default thisRoute;
