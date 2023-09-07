const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const {compare} = require('bcryptjs')
const authConfig = require('../configs/auth')
const {sign} = require('jsonwebtoken')

class SessionsController{
    async create(req, res){
        const {email, password} = req.body;
       
        const user = await knex('users').where({email}).first()

        if(!user){
            console.log('user')
            throw new AppError('Email e/ou senha inválidos.', 401)
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            console.log('senha')
            throw new AppError('Email e/ou senha inválidos.', 401);
        }

        console.log('to aqui')
        const {secret, expiresIn} = authConfig.jwt;

        const token = sign({}, secret, {subject: String(user.id), expiresIn});

        return res.json({user, token});
    }
}

module.exports = SessionsController;
