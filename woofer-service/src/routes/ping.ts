import {
  Ctx,
  DeleteMapping,
  GetMapping,
  IRouterContext,
  PathVariable,
  PostMapping,
  PutMapping,
  RequestBody,
  Router,
} from "node-server/routes";

class PingRouter extends Router {
  constructor() {
    super('/');
  }

  @GetMapping('ping')
  async ping(@Ctx ctx: IRouterContext): Promise<any> {
    ctx.body = "pong";
  }
}


export default PingRouter;