const Database = require('./database')
const Sequelize = require('sequelize')
const Funcionario = require('./employee')
const Filial = require('./branch')

const Document = Database.define('Documento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    numero_documento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    cod_cliente: Sequelize.INTEGER,
    num_pedido: Sequelize.STRING,
    data_emissao: Sequelize.DATE,

    data_vencimento: Sequelize.DATE,
    valor: Sequelize.FLOAT,

    cnpj_empregador: Sequelize.STRING,
    nome_empregado: Sequelize.STRING,
    cpf_empregado: Sequelize.STRING,
    cargo: Sequelize.STRING,

    nome_beneficiario: Sequelize.STRING,
    cpf_cnpj_beneficiario: Sequelize.STRING,
    nome_pagador: Sequelize.STRING,
    cpf_cnpj_pagador: Sequelize.STRING,

})

Document.belongsTo(Funcionario, {
    constraint: true,
    foreignKey: 'funcionarioId'
})

Document.belongsTo(Filial, {
    constraint: true,
    foreignKey: 'filialId'
})

module.exports = Document