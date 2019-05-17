import Video from "../model/video";
import VideosRepository from "../repository/videos";

class VideosService {
  async createVideo(video: Video): Promise<any> {

    let storedVideo: VideosRepository = await VideosRepository.fetchOneByVideoId(video.videoId);

    if (!storedVideo) {
      storedVideo = await new VideosRepository({ ...video }).save();
    }
    return new Video(storedVideo.toJSON());
  }
}

const videosService = new VideosService();

export default videosService;