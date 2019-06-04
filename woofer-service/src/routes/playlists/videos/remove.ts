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
import playlistItemsService from "../../../service/playlistItems";

class PlaylistsVideoRemoveRoute extends Router {
  constructor() {
    super('/playlists/:playlistId/videos');
  }

  @DeleteMapping('/:playlistItemId')
  async removeVideo(@Ctx ctx: IRouterContext, @PathVariable("playlistItemId") playlistItemId: number, @PathVariable("playlistId") playlistId: number): Promise<any> {
    try {
      const { user }: any = ctx.state;
      await playlistItemsService.removeVideo(playlistItemId, playlistId);
      ctx.body = "OK";
    } catch (e) {
      console.error(e);
    }
  }
}

export default PlaylistsVideoRemoveRoute;