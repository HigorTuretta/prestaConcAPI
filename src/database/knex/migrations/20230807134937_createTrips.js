exports.up = (knex) =>
  knex.schema.createTable("trips", (table) => {
    table.increments("id").primary();
    table.text("uf");
    table.text("city");
    table.integer("user_id").unsigned().references("id").inTable("users").onDelete('CASCADE');
    table.timestamp('created_at').default(knex.fn.now())
  });

exports.down = (knex) => knex.schema.dropTable("trips");