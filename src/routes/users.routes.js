const {Router} = require('express')
const userRoutes = Router()
const UsersController = require('../controllers/UsersController')


const usersController = new UsersController()

userRoutes.post('/register', usersController.create)

module.exports = userRoutes