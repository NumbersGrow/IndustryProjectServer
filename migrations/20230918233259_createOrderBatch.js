/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('order_batch', function (table) {
        table.increments('order_cart_id').primary();
        table.integer('profile_id').notNullable();
        table.integer('order_id').notNullable();
        table.integer('quantity').notNullable();
        table.foreign('profile_id').references('profile_id').inTable('profiles');
        table.foreign('order_id').references('order_id').inTable('orders');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('order_batch');
};
