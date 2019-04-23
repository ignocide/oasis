
class PlaylistItem {
    id?: number;
    playlistId?: number;
    videoId?: number;
    // video?: Video;
    constructor(playlistItem: PlaylistItem = {}) {
        this.id = playlistItem.id;
        this.playlistId = playlistItem.playlistId;
        this.videoId = playlistItem.videoId;
    }
}

export default PlaylistItem