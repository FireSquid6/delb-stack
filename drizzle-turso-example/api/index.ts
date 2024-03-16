import { type Context } from "elysia";
import type { Verbs } from "..";

export default function Route(): Verbs {
  return {
    get: (ctx: Context) => {
      return {
        body: {
          name: "jonathan deiss",
        },
        status: 200,
      };
    },
  };
}
