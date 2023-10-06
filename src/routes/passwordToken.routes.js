const {Router} = require('express')
const passwordTokenRoutes = Router()
const PasswordTokenController = require('../controllers/PasswordTokenController')


const passwordTokenController = new PasswordTokenController()

passwordTokenRoutes.post('/token', passwordTokenController.create)
passwordTokenRoutes.update('/:email', passwordTokenController.update)
passwordTokenController.get('/validar', passwordTokenRoutes.show)

module.exports = passwordTokenRoutes