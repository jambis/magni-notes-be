exports.seed = async function(knex) {
  return knex("exercises").insert([
    {
      category_id: 1,
      set_type_id: 1,
      user_id: 1,
      name: "Pendlay Pulls (Barbell)"
    }
  ]);
};
