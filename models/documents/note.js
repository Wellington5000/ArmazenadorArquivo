const Database = require('../database')
const Sequelize = require('sequelize')
const Funcionario = require('../employee')
const Empresa = require('../company')

const Note = Database.define('nota_fiscal', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cod_filial: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    num_nota: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cod_cliente: Sequelize.INTEGER,
    num_pedido: Sequelize.INTEGER,
    diretorio: Sequelize.STRING
})

Note.belongsTo(Funcionario, {
    constraint: true,
    foreignKey: 'funcionarioId'
})

Note.belongsTo(Empresa, {
    allowNull: false,
    constraint: true,
    foreignKey: 'empresaId'
})

module.exports = Note