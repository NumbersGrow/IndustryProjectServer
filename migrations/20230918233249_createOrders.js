/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('orders', function (table) {
        table.increments('order_id').primary();
        table.integer('profile_id').notNullable();
        table.integer('item_id').notNullable();
        table.decimal('price', 10, 2).notNullable();
        table.integer('quantity').notNullable();
        table.datetime('order_date').notNullable();
        table.foreign('profile_id').references('profile_id').inTable('profiles');
        table.foreign('item_id').references('item_id').inTable('items');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('orders');
};
