import { Context } from 'koa';
import * as jwt from 'jsonwebtoken';

const config = require('../../config.json');

const authMiddleware = async (ctx: Context, next: Function) => {
  const { req, response: res, state } = ctx;
  let authToken: any = req.headers['authorization'];
  if (!authToken) {
    res.status = 400;
    return;
  }

  const [type, token] = authToken.split(' ');
  if (type.toLowerCase() === 'basic') {
    if (token === 'Y3VzdG9tOnNlY3JldA==') {
      state.user = null;
      return next();
    } else {
      res.status = 401;
      res.body = {
        error: 'invalid_token',
      };

      return;
    }
  } else if (type.toLowerCase() === 'bearer') {
    let decodedToken: any = null;
    try {
      const cert = config.jwt.key;
      decodedToken = jwt.verify(token, cert, { algorithms: ['RS256'] });
    } catch (e) {
      //invaild token
      if (e.message === 'jwt expired') {
        res.status = 401;
        res.body = {
          error: 'invalid_token',
          error_description: `Access token expired: ${token}`,
        };
        return;
      }
      else {
        res.status = 401;
        res.body = {
          error: 'invalid_token',
        };
        return;
      }
    }
    const { user_name, authorities, id } = decodedToken;

    state.user = {
      user_name, authorities, id,
    };

    return next();
  } else {
    res.status = 400;
    return;
  }
};

export default authMiddleware;