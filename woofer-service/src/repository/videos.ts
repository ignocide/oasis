import bookshelf from '../lib/database';
// import * as Knex from 'knex'
// import * as Bookshelf from 'bookshelf'

// const bookshelf:Bookshelf = database.bookshelf;
// const knex:Knex = database.knex;
const TABLE_NAME = 'videos';
const Model = bookshelf.Model;

class VideosRepository extends Model<VideosRepository> {
  constructor(...args: any[]) {
    super(...args);
  }

  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  static async fetchOneByVideoId(videoId: string): Promise<VideosRepository> {
    // console.log(new this({ videoId }));
    const model:VideosRepository =  await new this({ videoId }).fetch();
    // return model
    return model;
  }
}

export default VideosRepository;
