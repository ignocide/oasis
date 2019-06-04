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

const ytdl = require('ytdl-core');

class YoutubeInfoRoute extends Router {
  constructor() {
    super('/youtube');
  }

  @GetMapping('/:youtubeVideoId/info')
  async readYoutubeVideoInfo(@Ctx ctx: IRouterContext, @PathVariable('youtubeVideoId') youtubeVideoId: string): Promise<any> {
    const info = await ytdl.getBasicInfo(youtubeVideoId);
    ctx.body = info;
  }
}


export default YoutubeInfoRoute;