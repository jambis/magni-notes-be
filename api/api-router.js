const router = require("express").Router();

const authRouter = require("../routers/auth-router");
const usersRouter = require("../routers/users-router");
const exercisesRouter = require("../routers/exercises-router");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/exercises", exercisesRouter);

module.exports = router;
