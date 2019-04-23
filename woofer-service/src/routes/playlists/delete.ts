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
import playlistsService from "../../service/playlists";

class PlaylistsDeleteRoute extends Router {
  constructor() {
    super('/playlists');
  }


  @DeleteMapping('/:playlistId')
  async deletePlaylist(@Ctx ctx: IRouterContext, @PathVariable('playlistId') playlistId: number): Promise<any> {
    const user: any = ctx.state.user;

    await playlistsService.deletePlaylists(playlistId, user.id);

    ctx.body = "OK";
  }

}


export default PlaylistsDeleteRoute;