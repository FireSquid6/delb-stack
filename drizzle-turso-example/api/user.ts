import { type Context } from "elysia";
import type { Verbs } from "delb-file-router";
import { createUser } from "../lib/auth";
import { findUserWithId } from "../lib/crud";
import type { SelectUser } from "../db/schema";

export default function Route(): Verbs {
  return {
    get: async (ctx: Context) => {
      // make search params
      const id = ctx.query["id"];

      if (!id) {
        ctx.set.status = 400;
        return {
          error: "missing id",
        };
      }

      let user: SelectUser;
      try {
        user = await findUserWithId(id);
      } catch (error) {
        ctx.set.status = 404;
        return {
          error: "internal server error. Couldn't find user.",
        };
      }

      ctx.set.status = 200;
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    },
    post: (ctx: Context) => {
      console.log(ctx.body);
      const body = ctx.body as any;

      const name = body.name;
      const email = body.email;
      const password = body.password;

      if (!name || !email || !password) {
        ctx.set.status = 400;
        return {
          error: "missing name, email, or password",
        };
      }

      try {
        createUser(name, email, password);
      } catch (error) {
        ctx.set.status = 500;
        return {
          error: "internal server error. Couldn't create user.",
        };
      }

      ctx.set.status = 201;
    },
  };
}
