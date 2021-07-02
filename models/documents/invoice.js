const Database = require('../database')
const Sequelize = require('sequelize')
const Funcionario = require('../employee')
const Empresa = require('../company')

const Invoice = Database.define('fatura', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    num_fatura: Sequelize.INTEGER,
    data_emissao: Sequelize.DATE,
    data_vencimento: Sequelize.DATE,
    diretorio: Sequelize.STRING
})

Invoice.belongsTo(Funcionario, {
    constraint: true,
    foreignKey: 'funcionarioId'
})

Invoice.belongsTo(Empresa, {
    allowNull: false,
    constraint: true,
    foreignKey: 'empresaId'
})

module.exports = Invoice