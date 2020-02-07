exports.seed = async function(knex) {
  return knex("workout_exercises").insert([
    {
      workout_id: 1,
      exercise_id: 1
    }
  ]);
};
