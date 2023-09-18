const { Router } = require("express");
const tripDataRoutes = Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const TripDataController = require("../controllers/TripDataController");

const tripDatacontroller = new TripDataController();

tripDataRoutes.use(ensureAuthenticated)

tripDataRoutes.get("/:id", tripDatacontroller.show);
tripDataRoutes.post("/", tripDatacontroller.create);
tripDataRoutes.put('/:id', tripDatacontroller.update);
// tripDataRoutes.delete('/:id', tripDatacontroller.delete);

module.exports = tripDataRoutes;
