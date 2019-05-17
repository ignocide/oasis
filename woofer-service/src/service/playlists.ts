import IPlaylist from "../routes/playlists/form/IPlaylistForm";
import PlaylistsRepository from "../repository/playlists";
import Playlist from '../model/playlist';
import { Collection } from "bookshelf";
import { HttpRequestError, HttpResponseStatus } from "../lib/error";

class PlaylistsService {
  async createPlaylist(playlistForm: IPlaylist, userId: number, isDefault: boolean = false): Promise<Playlist> {
    const playlist: PlaylistsRepository = await new PlaylistsRepository({ ...playlistForm, userId, isDefault }).save();
    return playlist.toJSON();
  }

  async fetchPlaylists(userId: number): Promise<Playlist[]> {
    console.log("here is fetch playlists")
    const playlists: Collection<PlaylistsRepository> = await PlaylistsRepository.fetchAllByUserId(userId);
    return playlists.toJSON();
  }

  async fetchPlaylist(playlistId: number, userId: number): Promise<Playlist> {
    const playlist: any = await PlaylistsRepository.fetchOneByIdAndUserId(playlistId, userId);
    return new Playlist(playlist.toJSON());
  }

  async fetchPlaylistWithVideos(playlistId: number, userId: number): Promise<Playlist> {
    const playlist: PlaylistsRepository = await PlaylistsRepository.fetchOneByIdAndUserIdWithVideos(playlistId, userId);
    // const videos: any = await PlaylistItemsRepository.getVideosByPlaylistId(playlistId);

    console.log(playlist.toJSON());
    // console.log(videos.toJSON());
    return new Playlist(playlist.toJSON());
  }

  async updatePlaylists(playlistId: number, userId: number, playlistForm: IPlaylist): Promise<Playlist> {
    const targetPlaylist: PlaylistsRepository = await PlaylistsRepository.fetchOneByIdAndUserId(playlistId, userId);

    if (!targetPlaylist) {
      throw new HttpRequestError(HttpResponseStatus.NOT_FOUND);
    }
    targetPlaylist.set('name', playlistForm.name);
    const updatePlaylist: PlaylistsRepository = await targetPlaylist.save();

    return updatePlaylist.toJSON();
  }

  async deletePlaylists(playlistId: number, userId: number): Promise<void> {
    const targetPlaylist: PlaylistsRepository = await PlaylistsRepository.fetchOneByIdAndUserId(playlistId, userId);

    if (!targetPlaylist) {
      throw new HttpRequestError(HttpResponseStatus.NOT_FOUND);
    }


    const isDefault = targetPlaylist.get('isDefault');

    targetPlaylist.destroy();

    if (isDefault) {
      let playlists = await new PlaylistsRepository({
        userId
      }).fetchAll();

      if (playlists.length) {
        let defaultPlaylist = playlists.first();
        defaultPlaylist.set('isDefault', true);
        defaultPlaylist.save();
      }
    }
  }
}

const playlistsService = new PlaylistsService();

export default playlistsService;