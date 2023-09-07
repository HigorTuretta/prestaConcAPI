const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class TripDataController{
    async create(req, res){
        const {dataLeave, dataReturn, dailyTotal} = req.body;
        const {trip_id} = req.params;

        const tripData = await knex('trip_data').insert({
            trip_id,
            dataLeave,
            dataReturn,
            dailyTotal
        });

        return res.status(201).json(tripData);
    }
}

module.exports = TripDataController;