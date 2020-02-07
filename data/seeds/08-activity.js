exports.seed = async function(knex) {
  return knex("activity").insert([
    {
      user_id: 1,
      exercise_id: 1,
      exercise_info: { set1: 5 }
    }
  ]);
};
