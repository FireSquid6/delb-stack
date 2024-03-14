import type { ApiRoute } from "..";

const thisRoute: ApiRoute = () => {
  return {
    get: () => {
      return {
        message: "Hello world!",
      };
    },
  };
};

export default thisRoute;
