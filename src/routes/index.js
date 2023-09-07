const { Router } = require("express");

const usersRouter = require("./users.routes");
const tripsRoutes = require("./trips.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/trips", tripsRoutes);
routes.use('/sessions' , sessionsRoutes);
module.exports = routes;
