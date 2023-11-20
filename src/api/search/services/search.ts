/**
 * search service
 */

import { MeiliSearch } from 'meilisearch'
import { Context } from "koa";

const client = new MeiliSearch({
    host: 'http://127.0.0.1:7700',
    apiKey: 'c742e8dbcb36781951819161de969d6408f2060267f139b11a023dc7f7d18388', // Use the public key not the private or master key to search.
})

export default () => ({
    getByMeiliSearch: async (ctx: Context) => {
        const searchText = ctx.request.query.key as string || ''
        console.log('search for : ' + searchText)
        const response = await client.index('book-info').search(searchText)
        const res = {
          code: 200,
          message: 'OK',
          data: response
        }
        return res
    },
});
