import PlaylistItemsRepository from "../repository/playlistItems";

class PlaylistItemsService {

  async addVideo(playlistId: number, videoId: number): Promise<void> {
    await new PlaylistItemsRepository({ playlistId, videoId }).save();

  }
}

const playlistItemsService = new PlaylistItemsService();

export default playlistItemsService;