import bookshelf from '../lib/database';
import { Collection } from 'bookshelf';
import PlaylistItemsRepository from './playlistItems';
import VideosRepository from './videos';
// import * as Knex from 'knex'
// import * as Bookshelf from 'bookshelf'

// const bookshelf:Bookshelf = database.bookshelf;
// const knex:Knex = database.knex;
const TABLE_NAME = 'playlists'
const Model = bookshelf.Model

class PlaylistsRepository extends Model<PlaylistsRepository> {
  constructor(...args: any[]) {
    super(...args)
  }

  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  // items() {
  //   return this.hasMany(PlaylistItemsRepository);
  // }

  items() {
    return this.hasMany(VideosRepository, 'video_id', 'id').through(PlaylistItemsRepository, 'id', 'playlist_id')
  }

  static async fetchAllbyUserId(userId: number): Promise<Collection<PlaylistsRepository>> {
    const playlists: Collection<PlaylistsRepository> = await new this({ userId: userId }).fetchAll();
    return playlists
  }

  static async fetchOneById(playlistId: number): Promise<PlaylistsRepository> {
    const playlist: PlaylistsRepository = await new this({ id: playlistId }).fetch();
    return playlist
  }

  // static async fetchOneByIdAndUserId(playlistId: number, userId: number): Promise<PlaylistsRepository> {
  //   const playlist: PlaylistsRepository = await new this({ id: playlistId, userId }).fetch({ withRelated: ['videos'] });
  //   console.log(JSON.stringify(playlist.related('videos')));
  //   return playlist
  // }

  static async fetchOneByIdAndUserId(playlistId: number, userId: number): Promise<PlaylistsRepository> {
    const playlist: PlaylistsRepository = await new this({ id: playlistId, userId }).fetch();
    return playlist;
  }


  static async fetchOneByIdAndUserIdWithVideos(playlistId: number, userId: number): Promise<PlaylistsRepository> {
    const playlist: PlaylistsRepository = await new this({ id: playlistId, userId }).fetch({ withRelated: ['items'] });
    return playlist
  }

}

// const PlaylistsRepository = bookshelf.Model.extend({
//   tableName: TABLE_NAME,
//   hasTimestamps: true,
//   byUserId(userId: number) {
//     return this.forge({userId: userId}).fetch();
//   }
// });
//
// console.log("!!",PlaylistsRepository)

export default PlaylistsRepository
