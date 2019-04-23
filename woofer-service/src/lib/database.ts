import * as Knex from 'knex'
import * as Bookshelf from 'bookshelf'
import * as fs from "fs";
import * as path from "path";

const config = require('../../config.json');

// var knex = require('knex')({
//   client: 'mysql',
//   connection: {
//     host     : '127.0.0.1',
//     user     : 'your_database_user',
//     password : 'your_database_password',
//     database : 'myapp_test',
//     charset  : 'utf8'
//   }
// });
//
// var bookshelf = require('bookshelf')(knex);
//
// var User = bookshelf.Model.extend({
//   tableName: 'users'
// });
//
//

interface ConnectionOptions {
  host: string,
  user: string,
  password: string,
  database: string,
  charset: string
}

// class Database  {
//   knex: Knex = null;
//   bookshelf: Bookshelf = null
//
//   constructor(connectionOptions: ConnectionOptions) {
//     this.knex = Knex({
//       client: 'mysql',
//       connection: connectionOptions
//     })
//     this.bookshelf = Bookshelf(this.knex);
//     this.bookshelf.plugin('bookshelf-camelcase');
//   }
// }
//
// const database: Database = new Database(config.mysql)
console.log(config.mysql)
const knex: Knex = Knex({
  client: 'mysql',
  connection: config.mysql
})
const bookshelf: Bookshelf = Bookshelf(knex);
bookshelf.plugin('bookshelf-camelcase');
export default bookshelf