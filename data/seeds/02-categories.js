exports.seed = async function(knex) {
  return knex("categories").insert([
    {
      name: "Back"
    },
    {
      name: "Chest"
    },
    {
      name: "Biceps"
    },
    {
      name: "Triceps"
    },
    {
      name: "Legs"
    },
    {
      name: "Compound"
    },
    {
      name: "Cardio"
    },
    {
      name: "Core"
    },
    {
      name: "Shoulders"
    },
    {
      name: "None"
    },
    {
      name: "Other"
    },
    {
      name: "Olympic"
    }
  ]);
};
