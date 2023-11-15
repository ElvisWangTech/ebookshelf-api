/**
 * ebooks service
 */

import { readFileSync } from 'fs'
import path from "path"
import * as cheerio from 'cheerio';
import type { Context } from 'koa';

const MIME_TYPE: Record<string, string> = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'html': 'text/html',
    'pdf': 'application/pdf',
  }
  
  function getBookPath(url: string) {
    // 相对地址直接返回
    if (url.startsWith('.')) {
      const pathToken = path.dirname(url).split('/')
      if (pathToken[1].endsWith('~chapters')) {
        return path.join(pathToken[1].slice(0, -'~chapters'.length), url)
      }
    }
    const [name, ] = getNameExt(url)
    return path.join(name, url)
  }
  
  function replaceHref(htmlStr: string, baseUrl: string) {
    const $ = cheerio.load(htmlStr);
    $("a[href]").each((index, link) => {
      const $link = $(link);
      $link.attr('href', `/reader?url=${baseUrl + '/' + $link.attr('href')}`)
    })
    // img的src处理
    $("img").each((index, img) => {
      const $img = $(img);
      $img.attr('src', `/api/ebooks?url=${baseUrl + '/' + $img.attr('src')}`)
    })
    return $.html()
  }
  
  function readFile(absPath: string) {
    const lowcasePath = absPath.toLowerCase()
    if (lowcasePath.endsWith('.jpg') || lowcasePath.endsWith('.jpeg') || lowcasePath.endsWith('.png')) {
      return readFileSync(absPath)
    } else if (lowcasePath.endsWith('.html')) {
      return readFileSync(absPath, 'utf-8')
    } else {
      return readFileSync(absPath)
    }
  }
  
  function getNameExt(longPath: string) {
    const tokens = path.basename(longPath).split('.')
    if (tokens.length < 3) {
      return tokens;
    } else {
      return [tokens.slice(0, tokens.length - 1).join('.'), tokens[tokens.length - 1]]
    }
  }
  
  function getMimeType(url: string) {
    const lowcasePath = url.toLowerCase()
    const [name, ext] = getNameExt(lowcasePath)
    return MIME_TYPE[ext] || ''
  }

async function handleRequest(ctx: any, method: string, jsonfy = false) {
    let url = '';
    if (method === 'POST') {
      url = ctx.request.body.url;
    } else {
      url = ctx.request.query.url as string || ''
    }
    const mimetype = getMimeType(url);
    console.log(`[${method}] /api/ebooks [url] ${url} [mimetype] ${mimetype}`)
    const bookPath = getBookPath(url)
    const baseUrl = path.dirname(url)
    const absPath = path.join(process.cwd(), '../../nas/share', 'ebooks', bookPath)
    console.log('read ebook: ' + absPath)
  
    const data = readFile(absPath)
    if (jsonfy) {
      const res = {
        code: 200,
        message: 'OK',
        data: mimetype === MIME_TYPE['html'] && typeof data === 'string' ? replaceHref(data, baseUrl): data
      }
      return res;
    } else {
      ctx.res.setHeader('Content-Type', mimetype)
      return data;
    }
  }

  export default () => ({
    getContent: async (ctx: Context) => {
        return await handleRequest(ctx, 'GET')
    },
    postContent: async (ctx: Context) => {
        console.log("handle postContent")
        return await handleRequest(ctx, 'POST', true)
    }
});