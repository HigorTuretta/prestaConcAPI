exports.up = (knex) =>
  knex.schema.createTable("tripNotes", (table) => {
    table.increments("id").primary();
    table.text("description");
    table.double("value");
    table.integer("trip_id").unsigned().references('id').inTable('trips').onDelete('CASCADE');
    table.integer("user_id").unsigned().references('id').inTable('users');
    table.timestamp('created_at').default(knex.fn.now())
  });

exports.down = (knex) => knex.schema.dropTable("tripNotes");