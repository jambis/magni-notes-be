exports.seed = async function(knex) {
  return knex("routines").insert([
    {
      user_id: 1,
      name: "Jambis PPL",
      public: true,
      description: "Push"
    }
  ]);
};
