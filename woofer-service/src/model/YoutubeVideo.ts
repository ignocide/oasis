import Video from "./video";

class YoutubeVideo {
  kind: string;
  videoId: string;
  description: string;
  title: string;
  thumbnail: string;

  constructor(video: YoutubeVideo) {
    this.kind = video.kind;
    this.videoId = video.videoId;
    this.title = video.title;
    this.thumbnail = video.thumbnail;
    this.description = video.description;
  }

  toVideo(){
    const video = new Video();
    video.id = null;
    video.videoId = this.videoId;
    video.name = this.title;
    video.thumbnail = this.thumbnail;
    video.description = this.description;

    return video;
  }
}

export default YoutubeVideo;