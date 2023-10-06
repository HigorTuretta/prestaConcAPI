const {Router} = require('express')
const passwordTokenRoutes = Router()
const PasswordTokenController = require('../controllers/PasswordTokenController')


const passwordTokenController = new PasswordTokenController()

passwordTokenRoutes.post('/recuperar-senha', passwordTokenController.create)
passwordTokenRoutes.update('/atualizar-senha', passwordTokenController.update)
passwordTokenController.get('/validar-token', passwordTokenRoutes.show)

module.exports = passwordTokenRoutes