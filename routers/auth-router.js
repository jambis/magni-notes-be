const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dbUsers = require("../models/users-models");
const generateToken = require("../utils/generate-token");
const {
  validateRegister,
  validateLogin
} = require("../middleware/auth-middleware");

/**
 * @api {post} /api/auth/register Register User
 * @apiName Register User
 * @apiGroup Auth
 *
 * @apiParam {string} username User's name, unique, required
 * @apiParam {string} password User's password, required
 *
 * @apiParamExample {json} Example Body
 * {
 *   "username": "Joker",
 *   "password": "happyface"
 * }
 *
 * @apiExample {js} Example usage
 * axios.post("/api/auth/register", {
 *    username: "Joker"
 *    password: "happyface"
 * })
 *
 * @apiSuccess (201) {Number} id User's id
 * @apiSuccess (201) {String} username User's name
 * @apiSuccess (201) {String} token User's access token
 *
 * @apiSuccessExample {json} Successful Response
 * {
 *   "id": 8,
 *   "username": "Joker",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im2wcWJpczYiLCJpYXQiOjE1NzM7YjEyMjYsImV4cCI6MTU3NDAwNzYyNn0.lbAqXnl1s1aIK9TgMSFJNt2ej63lfqn_dsDdNpH1ZMs"
 * }
 *
 */

router.post("/register", validateRegister, async (req, res) => {
  let { username, password } = req.body;

  const hash = bcrypt.hashSync(password, 12);
  password = hash;

  try {
    const user = await dbUsers.add({ username, password });
    const token = generateToken(user);

    res.status(201).json({ ...user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

/**
 * @api {post} /api/auth/login Login User
 * @apiName Login User
 * @apiGroup Auth
 *
 * @apiParam {string} username User's name, required
 * @apiParam {string} password User's password, required
 *
 * @apiParamExample {json} Example Body
 * {
 *   "username": "Joker",
 *   "password": "happyface"
 * }
 *
 * @apiExample {js} Example usage
 * axios.post("/api/auth/login", {
 *    username: "Joker"
 *    password: "happyface"
 * })
 *
 * @apiSuccess (200) {Number} id User's id
 * @apiSuccess (200) {String} username User's name
 * @apiSuccess (200) {String} token User's access token
 *
 * @apiSuccessExample {json} Successful Response
 * {
 *   "id": 8,
 *   "username": "Joker",
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imph23WczYiLCJpYXQiOjE1NzM5MjEyMjYsImV4cCI6MTU3NDAwNzYyNn0.lbAqXnl1s1aIK9TgMSFJNt2ej63lfqn_dsDdNpH1ZMs"
 * }
 *
 */

router.post("/login", validateLogin, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await dbUsers.getBy({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({ id: user.id, username: user.username, token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;
