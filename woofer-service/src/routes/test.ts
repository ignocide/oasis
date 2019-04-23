import {
  Ctx,
  GetMapping,
  MiddlewareRunner,
  Middleware,
  PathVariable,
  PostMapping,
  RequestBody,
  Router,
  IRouterContext,
} from "node-server/routes";
interface User {
  name: string,
  id: number
}

class ABC {
  @Middleware
  funcA(@RequestBody user: User, ctx: IRouterContext, next: () => void) {
    console.log('funcA')
    next()
  }

  @Middleware
  funcB(@RequestBody user: User, ctx: IRouterContext, next: () => void) {
    console.log('funcB')
    next()
  }

  @Middleware
  funcC(@RequestBody user: User, ctx: IRouterContext, next: () => void) {
    console.log('funcC')
    next()
  }
}


let abc = new ABC()


class TestRoute extends Router {
  constructor() {
    super('')
  }

  @GetMapping('/test')
  getTest(@Ctx ctx: IRouterContext, @RequestBody a: string, @RequestBody b: string, @RequestBody c: string): void {
    ctx.body = 'Hello World!';
  }

  @PostMapping('/user')
  @MiddlewareRunner(abc.funcA, abc.funcB, abc.funcC)
  getTest2(@RequestBody user: User, ctx: IRouterContext): void {
    ctx.body = `user info is that ${JSON.stringify(user)}`;
  }

  getTest3() {
    console.log("test3")
  }

  @GetMapping('/test/:id')
  getIdTest(@PathVariable('id') id: number, ctx: IRouterContext): void {
    ctx.body = `id is ${id}`;
  }
}


export default TestRoute