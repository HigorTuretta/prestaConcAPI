const {Router} = require('express')
const passwordTokenRoutes = Router()
const PasswordTokenController = require('../controllers/PasswordTokenController')


const passwordTokenController = new PasswordTokenController()

passwordTokenRoutes.post('/recuperar-senha', passwordTokenController.create)
passwordTokenRoutes.post('/atualizar-senha', passwordTokenController.update)

module.exports = passwordTokenRoutes