/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('profiles').del()
  await knex('profiles').insert([
    {
      userName: 'user1',
      email: 'user1@example.com',
      password: 'password1',
      date_created: new Date(),
    }
  ]);
};
