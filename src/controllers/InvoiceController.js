const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class InvoiceController {
  async index(req, res) {
    const { id } = req.params;

    const invoices = await knex("tripNotes").where({ trip_id: id });

    return res.status(200).json(invoices);
  }
  async create(req, res) {
    const { description, value } = req.body;
    const { id } = req.params;
    const user_id = req.user.id;
    try {
      const invoice = await knex("tripNotes").insert({
        description,
        value,
        trip_id: id,
        user_id,
      });
      return res.status(200).json(invoice);
    } catch (error) {
      throw new AppError("Não conseguimos localizar suas notas.");
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    await knex("tripNotes").where({id}).delete()

    return res.status(200).json();
  }
}

module.exports = InvoiceController;
