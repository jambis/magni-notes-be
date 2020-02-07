exports.seed = async function(knex) {
  return knex("workouts").insert([
    {
      routine_id: 1,
      name: "Day 1 - Pull",
      description: "Pull day is focused on back and biceps"
    }
  ]);
};
