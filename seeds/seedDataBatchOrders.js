/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('order_batch').del()
  await knex('order_batch').insert([
    {
      profile_id: 1,
      order_id: 4,
      quantity: 2,
    }
  ]);
};
