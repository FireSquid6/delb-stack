import { type Context } from "elysia";

export const GET = () => {
  return {
    body: {
      name: "jonathan deiss",
    },
    status: 2000,
  };
};
