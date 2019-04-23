import { Context } from 'koa'
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { HttpRequestError } from "../lib/error";
const config = require('../../config.json')

const errorMiddleware = async (ctx: Context, next: Function) => {
  const { req, response: res, state } = ctx;
  try {
    await next();
  } catch (err) {
    // will only respond with JSON
    console.error(err)
    if (err instanceof HttpRequestError) {
      ctx.status = err.status || 500;
      ctx.body = {
        message: err.message
      };
    }
    else {
      ctx.status = 500;
      ctx.body = {
        message: 'unhandled error'
      }
    }
  }
}

export default errorMiddleware