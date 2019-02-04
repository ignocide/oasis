import database from '../lib/database';

const {bookshelf, knex} = database;
const TABLE_NAME = 'delivery'

class Delivery extends bookshelf.Model<Delivery> {
  get tableName() {
    return TABLE_NAME;
  }

  get hasTimestamps() {
    return true;
  }

  // static byEmail(email) {
  //   return this.forge().query({where:{ email: email }}).fetch();
  // }
}

const init = async function () {
  try {
    const isExisted = await knex.schema.hasTable(TABLE_NAME)
    if (!isExisted) {
      return knex.schema.createTable(TABLE_NAME, function (t) {
        t.increments('id').primary();
        t.string('company', 100).notNullable();
        t.string('invoice_number', 100).notNullable();
        //telegram id
        t.string('chat_id', 100).notNullable();
        t.integer('status_code').defaultTo(0);
        t.timestamps();
      });

    }
    else {


    }
  }
  catch (e) {
    console.error(e)
  }
};

export {init}
export default Delivery
