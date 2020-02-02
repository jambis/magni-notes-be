const express = require("express");

const configureMiddleware = require("../middleware/configure-middleware");
const apiRouter = require("./api-router");

const server = express();
configureMiddleware(server);

server.use("/api", apiRouter);

module.exports = server;
