// import Koa from 'koa';
import { Koa } from "./koa.mjs";
import http from 'node:http'

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});

server.listen(3002, 'localhost', () => {
  console.log('Server running at http://localhost:3002/');
});

const app = new Koa();

// app.use(async (ctx, next) => {
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
// })

// 响应
// app.use(ctx => {
//   ctx.body = 'Hello Koa';
// });

// app.use(async (ctx, next) => {
//   ctx.body = '1';
//   await next();
//   ctx.body += '5';
// });

// app.use(async (ctx, next) => {
//   ctx.body += '2';
//   await next();
//   ctx.body += '4';
// });

// app.use(async (ctx) => {
//   ctx.body += '3';
// });

async function middleware1(ctx, next) {
  console.log('Middleware 1 before');
  await next();
  console.log('Middleware 1 after');
}

async function middleware2(ctx, next) {
  console.log('Middleware 2 before');
  await next();
  console.log('Middleware 2 after');
}

app.use(middleware1);
app.use(middleware2);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
