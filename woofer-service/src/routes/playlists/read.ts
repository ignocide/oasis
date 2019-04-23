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
import Playlist from "../../model/playlist";
import playlistsService from "../../service/playlists";

class PlaylistsReadRoute extends Router {
  constructor() {
    super('/playlists');
  }

  @GetMapping('/')
  async readPlaylists(@Ctx ctx: IRouterContext): Promise<any> {
    const user: any = ctx.state.user;
    let playlists: Playlist[] = await playlistsService.fetchPlaylists(user.id);
    if (!playlists.length) {
      await playlistsService.createPlaylist({ name: "기본" }, user.id, true);
      playlists = await playlistsService.fetchPlaylists(user.id);
    }

    ctx.body = { playlists }
    ;
  }


  @GetMapping('/:playlistId')
  async readPlaylist(@Ctx ctx: IRouterContext, @PathVariable('playlistId') playlistId: number): Promise<any> {
    const user: any = ctx.state.user;
    let playlist: Playlist = await playlistsService.fetchPlaylistWithVideos(playlistId, user.id);

    ctx.body = playlist;
  }

}


export default PlaylistsReadRoute;