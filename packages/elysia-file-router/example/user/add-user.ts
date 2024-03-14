import type { ApiRoute } from "../../index";

const thisRoute: ApiRoute = () => {
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
