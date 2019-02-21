import * as Knex from 'knex'
import * as Bookshelf from 'bookshelf'
import Singleton from "./singleton";
import * as fs from "fs";
import * as path from "path";

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

class Database extends Singleton {
  knex: Knex = null;
  bookshelf: Bookshelf = null

  async init(connectionOptions: ConnectionOptions) {
    this.knex = Knex({
      client: 'mysql',
      connection: connectionOptions
    })
    this.bookshelf = Bookshelf(this.knex);
    this.bookshelf.plugin('bookshelf-camelcase');
    await this.loadRepositories();
  }

  protected async loadRepositories(): Promise<any> {
    let repositoryFiles = await fs.readdirSync(path.join(__dirname, '../repository'));
    repositoryFiles.forEach(async (fileName) => {
      let repositoryFilePath = path.join(__dirname, '../repository', fileName)
      let repositoryFile: any
      repositoryFile = require(repositoryFilePath);
      await repositoryFile.init();
    })
  }
}


const database: Database = Database.getInstance();
export default database;