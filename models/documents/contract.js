const Database = require('../database')
const Sequelize = require('sequelize')
const Funcionario = require('../employee')
const Empresa = require('../company')

const Contract = Database.define('contrato', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cnpj_empregador: Sequelize.STRING,
    nome_empregado: Sequelize.STRING,
    cpf_empregado: Sequelize.STRING,
    cargo: Sequelize.STRING,
    diretorio: Sequelize.STRING
})

Contract.belongsTo(Funcionario, {
    allowNull: false,
    constraint: true,
    foreignKey: 'funcionarioId'
})

Contract.belongsTo(Empresa, {
    allowNull: false,
    constraint: true,
    foreignKey: 'empresaId'
})

module.exports = Contract