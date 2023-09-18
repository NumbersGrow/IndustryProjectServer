/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('orders').del()
  await knex('orders').insert([
    {
      profile_id: 1,
      item_id: 26,
      price: 24.99,
      quantity: 2,
      order_date: new Date(),
    }
  ]);
};
