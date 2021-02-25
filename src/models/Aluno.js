const { Model, DataTypes } = require('sequelize')

class Aluno extends Model {
    static init(sequelize) {
        super.init({
            matricula: DataTypes.STRING,
            nome: DataTypes.STRING,
            senha: DataTypes.STRING,
            token: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'alunos'
        })
    }
}

module.exports = Aluno