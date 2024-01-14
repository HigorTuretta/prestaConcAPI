const { Router } = require("express");

const usersRouter = require("./users.routes");
const tripsRoutes = require("./trips.routes");
const sessionsRoutes = require("./sessions.routes");
const tripdataRoutes = require("./tripData.routes");
const invoicesRoutes = require("./invoices.routes");
const passwordTokenRoutes = require("./passwordToken.routes");
const contactRoutes = require("./contact.routes");
const routes = Router();

routes.use("/users", usersRouter);
routes.use("/trips", tripsRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/details", tripdataRoutes);
routes.use("/invoices", invoicesRoutes);
routes.use("/passwordRecovery", passwordTokenRoutes);
routes.use("/contact", contactRoutes);
module.exports = routes;
