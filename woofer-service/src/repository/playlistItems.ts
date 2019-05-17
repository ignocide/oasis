import bookshelf from '../lib/database';
import VideosRepository from './videos';
// import * as Knex from 'knex'
// import * as Bookshelf from 'bookshelf'

// const bookshelf:Bookshelf = database.bookshelf;
// const knex:Knex = database.knex;
const TABLE_NAME = 'playlist_items';
const Model = bookshelf.Model;

class PlaylistItemsRepository extends Model<PlaylistItemsRepository> {
  constructor(...args: any[]) {
    super(...args);
  }

  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  videos() {
    return this.hasOne(VideosRepository,'id','video_id');
  }

  static async getVideosByPlaylistId(playlistId: number): Promise<any> {
    let result: any = await new this({ playlistId }).fetchAll({ withRelated: ['videos'] });
    return result;
  }

}

export default PlaylistItemsRepository;
