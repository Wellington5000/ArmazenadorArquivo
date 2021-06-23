const Database = require('../database')
const Sequelize = require('sequelize')
const Funcionario = require('../employee')

const License = Database.define('alvara', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    num_alvara: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },

    cnpj: Sequelize.STRING,
    data_emissao: Sequelize.DATE,
    data_validade: Sequelize.DATE,
    diretorio: Sequelize.STRING,
})

License.belongsTo(Funcionario, {
    constraint: true,
    foreignKey: 'funcionarioId'
})

module.exports = License