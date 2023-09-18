const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class TripsController {
  async index(req, res) {
    const user_id = req.user.id
    console.log(user_id)
    const trips = await knex("trips").where({user_id})
    .innerJoin("tripData", "trips.id", "=", "tripData.trip_id")
    .select("*");    
    return res.status(200).json(trips);
  }

  async create(req, res) {
    const { uf, city } = req.body; 
    const  user_id = req.user.id;
    const trip = await knex("trips").insert({ uf, city, user_id });    
    return res.status(201).json(trip);
  }

  async update(req, res) {
    const { id } = req.params;
    const { uf, city } = req.body;
    await knex("trips").where({ id }).update({ uf, city });
    return res.status(200).json(`Viagem atualizada.`);
  }

  async delete(req, res) {
    const { id } = req.params;
    const trip = await knex("trips").where({ id }).del();
    return res.status(200).json(`Viagem ID:${trip} deletada.`);
  }
}

module.exports = TripsController;
