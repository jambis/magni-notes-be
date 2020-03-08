const db = require("../data/dbConfig");

module.exports = { add, get, getBy, getAll, remove };

// async function getBy(filter) {
//   const user = await db("exercises")
//     .where(filter)
//     .returning(["id", "username", "password"])
//     .first();

//   return user;
// }
async function add(exerciseData) {
  const [id] = await db("exercises")
    .insert(exerciseData)
    .returning("id");

  return db("exercises")
    .where({ id })
    .first();
}

async function getAll() {
  return await db("exercises");
}

async function getBy(filter) {
  return await db("exercises")
    .where(filter)
    .first();
}

async function get(userId) {
  return await db("exercises")
    .where({ user_id: userId })
    .orWhere({ user_id: null });
}

async function remove(id) {
  return await db("exercises")
    .where({ id })
    .del();
}
