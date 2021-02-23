const Sequelize = require('sequelize')
const config = require('./../config/db')
const Aluno = require('./../models/Aluno')
const Image = require('./../models/Image')

const connection = new Sequelize(config)

Aluno.init(connection)
Image.init(connection)

module.exports = connection