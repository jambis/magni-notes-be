exports.seed = async function(knex) {
  return knex("set_type").insert([
    {
      name: "Barbell"
    },
    {
      name: "Dumbbell"
    },
    {
      name: "Machine"
    },
    {
      name: "Weight bodyweight"
    },
    {
      name: "Assisted Body"
    },
    {
      name: "Reps Only"
    },
    {
      name: "Cardio exercise"
    },
    {
      name: "Duration"
    }
  ]);
};
