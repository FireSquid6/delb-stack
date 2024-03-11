import type { TestCapsule } from "../../example-server";
import type { ApiRoute } from "../..";

const thisRoute: ApiRoute<TestCapsule> = () => {
  return {
    get: () => {
      return "get";
    },
    post: () => {
      return "post";
    },
    put: () => {
      return "put";
    },
    patch: () => {
      return "patch";
    },
    delete: () => {
      return "delete";
    },
  };
};

export default thisRoute;
