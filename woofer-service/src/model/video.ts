
class Video {
    id?: number;
    videoId?: string;
    title?: string;
    thumbnail?: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    // video?: Video;
    constructor(video: Video = {}) {
        this.id = video.id;
        this.videoId = video.videoId;
        this.title = video.title;
        this.thumbnail = video.thumbnail;
        this.description = video.description;
        this.createdAt = video.createdAt;
        this.updatedAt = video.updatedAt;
    }
}

export default Video