import type { ApiRoute } from "delb-file-router";
import type { Capsule } from "..";

const userRoute: ApiRoute<Capsule> = () => {
  return {
    get: () => {
      return {
        message: "Hello world!",
      };
    },
  };
};

export default userRoute;
