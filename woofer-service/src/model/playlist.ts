import Video from "./video";

interface IPlaylist {
    id?: number;
    name?: string;
    userId?: number;
    isDefault?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    items?: Video[];
}

class Playlist implements IPlaylist {
    id?: number;
    name?: string;
    userId?: number;
    isDefault?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    items?: Video[];

    constructor(playlist: IPlaylist = {}) {
        this.id = playlist.id;
        this.name = playlist.name;
        this.userId = playlist.userId;
        this.isDefault = playlist.isDefault;
        this.createdAt = playlist.createdAt;
        this.updatedAt = playlist.updatedAt;

        if (playlist.items) {
            this.items = playlist.items.map((video) => new Video(video))
        }
    }
}

export default Playlist