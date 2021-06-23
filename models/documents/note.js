const Database = require('../database')
const Sequelize = require('sequelize')
const Funcionario = require('../employee')

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
    cpf_cnpj: Sequelize.STRING,
    data_emissao: Sequelize.DATE,
    diretorio: Sequelize.STRING
})

Note.belongsTo(Funcionario, {
    constraint: true,
    foreignKey: 'funcionarioId'
})

module.exports = Note