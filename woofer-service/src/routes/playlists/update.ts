import { Ctx, GetMapping, PutMapping, DeleteMapping, PathVariable, PostMapping, RequestBody, Router, IRouterContext, } from "node-server/routes";
import PlaylistsRepository from '../../repository/playlists'
import IPlaylist from './form/IPlaylistForm';
import playlistsService from "../../service/playlists";
import Playlist from "../../model/playlist";

class PlaylistsUpdateRoute extends Router {
  constructor() {
    super('/playlists')
  }

  @PutMapping('/:playlistId')
  async updatePlaylist(@Ctx ctx: IRouterContext, @RequestBody playlistForm: IPlaylist, @PathVariable('playlistId') playlistId: number): Promise<any> {
    const user: any = ctx.state.user;

    const playlist: Playlist = await playlistsService.updatePlaylists(playlistId, user.id, playlistForm)
    ctx.body = playlist;
  }

}

export default PlaylistsUpdateRoute