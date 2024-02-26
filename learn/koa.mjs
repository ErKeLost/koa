import http from "node:http";

export class Koa {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }

  callback() {
    return async (req, res) => {
      const ctx = this.createContext(req, res);
      const fn = this.compose(this.middlewares);
      // return fn(ctx).then(() => this.respond(ctx));
      await fn(ctx)
      return this.respond(ctx);
    };
  }

  createContext(req, res) {
    const context = { req, res };
    context.body = null;
    return context;
  }

  respond(ctx) {
    ctx.res.end(ctx.body);
  }

  compose(middlewares) {
    return function (ctx) {
      const dispatch = (i) => {
        let fn = middlewares[i];
        if (!fn) return Promise.resolve();
        return Promise.resolve(fn(ctx, () => dispatch(i + 1)));
      };
      return dispatch(0);
    };
  }
}


