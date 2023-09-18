/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', function (table) {
        table.increments('item_id').primary();
        table.string('category', 255).notNullable();
        table.text('description');
        table.string('scent', 255);
        table.decimal('price', 10, 2).notNullable();
        table.string('image', 255);
        table.text('ingredients');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('items');
};
