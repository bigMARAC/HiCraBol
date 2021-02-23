const express = require('express')
const AlunoController = require('./controllers/AlunoController')
const ImageController = require('./controllers/ImageController')
const multer = require('multer')
const multerConfig = require('./config/multer')

const routes = express.Router()

routes.post('/alunos', AlunoController.create)
routes.post('/alunos/login', AlunoController.auth)

routes.post('/pictures', multer(multerConfig).single("file"), ImageController.create)

module.exports = routes