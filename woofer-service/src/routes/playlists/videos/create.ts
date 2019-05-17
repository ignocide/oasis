import {
  Ctx,
  DeleteMapping,
  GetMapping,
  IRouterContext,
  PathVariable,
  PostMapping,
  PutMapping,
  RequestBody,
  Router,
} from "node-server/routes";
import YoutubeVideo from "../../../model/youtubeVideo";
import Video from "../../../model/video";
import videosService from "../../../service/videos";
import playlistItemsService from "../../../service/playlistItems";

class PlaylistsVideoCreateRoute extends Router {
  constructor() {
    super('/playlists/:playlistId/videos');
  }

  @PostMapping('/')
  async addVideo(@Ctx ctx: IRouterContext, @PathVariable("playlistId") playlistId: number, @RequestBody youtubeVideo: YoutubeVideo): Promise<any> {
    try {

      const { user }: any = ctx.state;
      const video: Video = new YoutubeVideo(youtubeVideo).toVideo();
      let createdVideo = await videosService.createVideo(video);
      console.log(createdVideo)
      await playlistItemsService.addVideo(playlistId,createdVideo.id);
      ctx.body = createdVideo;
    } catch (e) {
      console.error(e);
    }
  }
}

export default PlaylistsVideoCreateRoute;