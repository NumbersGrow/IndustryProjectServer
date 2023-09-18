/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {
      category: 'Skincare',
      description: 'Moisturizing Face Cream',
      scent: 'Unscented',
      price: 24.99,
      image: 'face_cream.jpg',
      ingredients: 'Water, Glycerin, Shea Butter, ...',
    },
    {
      category: 'Bath & Body',
      description: 'Lavender Bath Bomb',
      scent: 'Lavender',
      price: 5.99,
      image: 'lavender_bath_bomb.jpg',
      ingredients: 'Sodium Bicarbonate, Citric Acid, ...',
    }
  ]);
};
