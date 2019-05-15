import Video from "./video";

interface IPlaylist {
    id?: number;
    name?: string;
    userId?: number;
    isDefault?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;

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
        this.createdAt = new Date(playlist.createdAt);
        this.updatedAt = new Date(playlist.updatedAt);

        if (playlist.items) {
            this.items = playlist.items.map((video) => new Video(video))
        }
    }
}

export default Playlist