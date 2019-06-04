import PlaylistItemsRepository from "../repository/playlistItems";

class PlaylistItemsService {

  async addVideo(playlistId: number, videoId: number): Promise<void> {
    await new PlaylistItemsRepository({ playlistId, videoId }).save();

  }

  async removeVideo(playlistItemId: number, playlistId: number): Promise<void> {
    await PlaylistItemsRepository.removeById(playlistItemId, playlistId);

  }
}

const playlistItemsService = new PlaylistItemsService();

export default playlistItemsService;