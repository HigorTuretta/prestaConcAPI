const { Router } = require("express");
const invoicesRoutes = Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')
const InvoiceController = require("../controllers/InvoiceController");

const invoicesController = new InvoiceController();

invoicesRoutes.use(ensureAuthenticated)

invoicesRoutes.get("/:id", invoicesController.index);
invoicesRoutes.post("/:id", invoicesController.create);
invoicesRoutes.delete('/:id', invoicesController.delete);

module.exports = invoicesRoutes;
