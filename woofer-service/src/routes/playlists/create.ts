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
import IPlaylist from './form/IPlaylistForm';
import playlistsService from "../../service/playlists";
import Playlist from "../../model/playlist";

class PlaylistsCreateRoute extends Router {
  constructor() {
    super('/playlists');
  }

  @PostMapping('/')
  async createPlaylist(@Ctx ctx: IRouterContext, @RequestBody youtubeVideo: IVideoForm): Promise<any> {
    const user: any = ctx.state.user;
    let playlist: Playlist = await playlistsService.createPlaylist(playlistForm, user.id, true);
    ctx.body = playlist;
  }
}


export default PlaylistsCreateRoute;