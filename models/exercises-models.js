const db = require("../data/dbConfig");

module.exports = { add, get };

// async function getBy(filter) {
//   const user = await db("exercises")
//     .where(filter)
//     .returning(["id", "username", "password"])
//     .first();

//   return user;
// }

async function get() {
  const exercises = await db("exercises");

  console.log(exercises);
  return exercises;
}

async function add(exerciseData) {
  const [id] = await db("exercises")
    .insert(exerciseData)
    .returning("id");

  return db("exercises")
    .where({ id })
    .first();
}
