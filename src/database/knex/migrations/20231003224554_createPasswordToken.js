exports.up = (knex) =>
  knex.schema.createTable("passwordToken", (table) => {
    table.increments("id").primary();
    table.text("token");
    table.text("email").unique();
    table.timestamp('created_at').default(knex.fn.now())
  });

exports.down = (knex) => knex.schema.dropTable("passwordToken");
