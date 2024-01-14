const { Router } = require("express");
const contactRoutes = Router();
const ContactController = require("../controllers/ContactController");

const contactController = new ContactController();

contactRoutes.post("/sugest", contactController.create);

module.exports =contactRoutes;
