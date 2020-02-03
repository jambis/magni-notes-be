const router = require("express").Router();

const authRouter = require("../routers/auth-router");

router.use("/auth", authRouter);

module.exports = router;
