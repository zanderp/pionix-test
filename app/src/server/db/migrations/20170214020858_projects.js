
exports.up = function(knex, Promise) {
  return knex.schema.createTable('projects', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('projects');
};
