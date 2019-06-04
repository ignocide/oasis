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
import * as ytdl from 'ytdl-core';

class YoutubeInfoRoute extends Router {
  constructor() {
    super('/youtube');
  }

  @GetMapping('/:youtubeVideoId/mp3')
  async readYoutubeVideoInfo(@Ctx ctx: IRouterContext, @PathVariable('youtubeVideoId') youtubeVideoId: string): Promise<any> {
    const { stream, info } = await getStreamWithInfo(youtubeVideoId);
    ctx.response.type = info.headers['content-type'];
    ctx.response.length = info.headers['content-length'];
    ctx.response.body = stream;
  }
}

const getStreamWithInfo = (youtubeVideoId: string): Promise<any> => {
  return new Promise((res) => {
    const stream = ytdl(youtubeVideoId, { filter: 'audioonly' });

    stream.on('response', (info) => {
      return res({
        stream, info
      });
    });

  });
};


export default YoutubeInfoRoute;