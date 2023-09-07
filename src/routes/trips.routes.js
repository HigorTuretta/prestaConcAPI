const { Router } = require("express");
const tripsRoutes = Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const TripesController = require("../controllers/TripsController");

const tripsController = new TripesController();

tripsRoutes.use(ensureAuthenticated)

tripsRoutes.get("/", tripsController.index);
tripsRoutes.post("/", tripsController.create);
tripsRoutes.put('/:id', tripsController.update);
tripsRoutes.delete('/:id', tripsController.delete);

module.exports = tripsRoutes;
