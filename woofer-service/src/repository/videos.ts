import bookshelf from '../lib/database';
import { Collection } from 'bookshelf';
// import * as Knex from 'knex'
// import * as Bookshelf from 'bookshelf'

// const bookshelf:Bookshelf = database.bookshelf;
// const knex:Knex = database.knex;
const TABLE_NAME = 'videos'
const Model = bookshelf.Model

class VideosRepository extends Model<VideosRepository> {
    constructor(...args: any[]) {
        super(...args)
    }

    get tableName() {
        return TABLE_NAME;
    }

    get hasTimestamps() {
        return true;
    }

}

export default VideosRepository
