const { Model, DataTypes } = require('sequelize')

class Image extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING
        }, {
            sequelize,
            tableName: 'images'
        })
    }
}

module.exports = Image