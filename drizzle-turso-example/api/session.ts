import type { Verbs } from "delb-file-router";
import type { Context } from "elysia";
import { newSession } from "../lib/sessions";
import { passwordIsValid } from "../lib/auth";
import { findUserWithEmail } from "../lib/crud";

export default function Route(): Verbs {
  return {
    post: async (ctx: Context) => {
      const body = ctx.body as any;

      const email = body.email;
      const password = body.password;

      if (!email || !password) {
        ctx.set.status = 400;
        return {
          error: "missing email or password",
        };
      }

      const valid = await passwordIsValid(email, password);
      if (!valid) {
        ctx.set.status = 401;
        return {
          error: "invalid email or password",
        };
      }

      try {
        const user = await findUserWithEmail(email);
        const cookie = await newSession(user.id);

        ctx.set.status = 201;
        ctx.headers["Set-Cookie"] = cookie;
        return cookie;
      } catch (error) {
        ctx.set.status = 500;
        return {
          error: "internal server error. Couldn't login user.",
        };
      }
    },
    delete: async (ctx: Context) => { },
  };
}
