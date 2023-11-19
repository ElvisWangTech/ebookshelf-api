/**
 * A set of functions called "actions" for `search`
 */

import { Context, Next } from "koa";

export default {
  getByMeiliSearch: async (ctx: Context, next: Next) => {
    try {
      const data = await strapi.service("api::search.search").getByMeiliSearch(ctx);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
