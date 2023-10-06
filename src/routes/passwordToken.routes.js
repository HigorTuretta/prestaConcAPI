const {Router} = require('express')
const passwordTokenRoutes = Router()
const PasswordTokenController = require('../controllers/PasswordTokenController')


const passwordTokenController = new PasswordTokenController()

passwordTokenRoutes.post('/token', passwordTokenController.create)
passwordTokenRoutes.put('/:email', passwordTokenController.update)
passwordTokenRoutes.post('/validar', passwordTokenController.show)

module.exports = passwordTokenRoutes