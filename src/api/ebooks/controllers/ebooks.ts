/**
 * A set of functions called "actions" for `ebooks`
 */

import { Context, Next } from "koa";

export default {
  getContent: async (ctx: Context, next: Next) => {
    try {
      const data = await strapi.service("api::ebooks.ebooks").getContent(ctx);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
  postContent: async (ctx: Context, next: Next) => {
    try {
      const data = await strapi.service("api::ebooks.ebooks").postContent(ctx);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
