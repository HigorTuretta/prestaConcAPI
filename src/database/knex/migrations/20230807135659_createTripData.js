exports.up = (knex) =>
  knex.schema.createTable("tripData", (table) => {
    table.increments("id").primary();
    table.date("dataLeave");
    table.date("dataReturn");
    table.double('dailyTotal');
    table.double('totalSpend');
    table.integer("trip_id").unsigned().references('id').inTable('trips').onDelete('CASCADE');
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
  });

exports.down = (knex) => knex.schema.dropTable("tripData");