const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TripDataController {
  async create(req, res) {
    const { dataLeave, dataReturn, dailyTotal, totalSpend, trip_id } = req.body;

    const tripData = await knex("tripData").insert({
      trip_id,
      dataLeave,
      dataReturn,
      dailyTotal,
      totalSpend,
    });

    return res.status(201).json(tripData);
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const tripData = await knex("tripData")
        .select("*")
        .where({ trip_id: id })
        .join("trips", "tripData.trip_id", "trips.id")
        .select("trips.city", "trips.UF");
      const tripNotes = await knex("tripNotes").where({ trip_id: id });

      return res.status(200).json({
        tripData,
        tripNotes,
      });
    } catch (error) {
      console.error(error);
      throw new AppError(
        `Erro ao buscar dados da viagem. Erro: ${error.message}`
      );
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { dataLeave, dataReturn, dailyTotal, totalSpend } = req.body;

    // const tripData = await knex('tripData').where({trip_id: id}).first()

    try {
      const tripData = await knex("tripData").where({ trip_id: id }).update({
        dataLeave,
        dataReturn,
        dailyTotal,
        totalSpend,
        updated_at: knex.fn.now(),
      });

      return res.status(200).json(tripData);
    } catch (error) {
      throw new AppError("Falha ao atualizar dados da viagem.");
    }
  }
}

module.exports = TripDataController;
