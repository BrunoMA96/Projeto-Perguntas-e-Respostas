const Sequelize = require('sequelize')

const connection = new Sequelize('guiperguntas', 'root', '147258369', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection