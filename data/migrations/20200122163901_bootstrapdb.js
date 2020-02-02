exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      tbl.increments();
      tbl
        .string("username", 255)
        .notNullable()
        .unique();
      tbl.string("password", 255).notNullable();
      tbl.string("avatar", 255);
    })
    .createTable("routines", tbl => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .references("users.id");
      tbl.string("name", 128).notNullable();
      tbl.boolean("public").defaultTo("true");
      tbl.text("description");
    })
    .createTable("workouts", tbl => {
      tbl.increments();
      tbl
        .integer("routine_id")
        .unsigned()
        .references("routines.id");
      tbl.string("name");
      tbl.text("description");
    })
    .createTable("categories", tbl => {
      tbl.increments();
      tbl.string("name");
    })
    .createTable("set_type", tbl => {
      tbl.increments();
      tbl.string("name");
    })
    .createTable("exercises", tbl => {
      tbl.increments();
      tbl
        .integer("category_id")
        .unsigned()
        .references("categories.id");
      tbl
        .integer("set_type_id")
        .unsigned()
        .references("set_type.id");
      tbl
        .integer("user_id")
        .unsigned()
        .references("users.id");
    })
    .createTable("workout_exercises", tbl => {
      tbl.increments();
      tbl
        .integer("workout_id")
        .unsigned()
        .references("workouts.id");
      tbl
        .integer("exercise_id")
        .unsigned()
        .references("exercises.id");
    })
    .createTable("activity", tbl => {
      tbl.increments();
      tbl
        .integer("user_id")
        .unsigned()
        .references("users.id");
      tbl
        .integer("exercise_id")
        .unsigned()
        .references("exercises.id");
      tbl
        .datetime("date")
        .notNullable()
        .defaultTo(knex.fn.now());
      tbl.jsonb("exercise_info").notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("activity")
    .dropTableIfExists("workout_exercises")
    .dropTableIfExists("exercises")
    .dropTableIfExists("set_type")
    .dropTableIfExists("categories")
    .dropTableIfExists("workouts")
    .dropTableIfExists("routines")
    .dropTableIfExists("users");
};
