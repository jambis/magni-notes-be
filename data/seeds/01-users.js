const bcrypt = require("bcryptjs");

exports.seed = async function(knex) {
  return knex("users").insert([
    {
      username: "Adriel",
      password: `${bcrypt.hashSync("pass", 12)}`
    },
    {
      username: "Rey",
      password: `${bcrypt.hashSync("pass", 12)}`
    },
    {
      username: "Jamie",
      password: `${bcrypt.hashSync("pass", 12)}`
    }
  ]);
};
