const Database = require('../database')
const Sequelize = require('sequelize')
const Funcionario = require('../employee')

const PaymentVoucher = Database.define('comprovante', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    cpf_cnpj_beneficiario: Sequelize.STRING,
    nome_pagador: Sequelize.STRING,
    cpf_cnpj_pagador: Sequelize.STRING,
    data_pagamento: Sequelize.DATE,
    diretorio: Sequelize.STRING
})

PaymentVoucher.belongsTo(Funcionario, {
    constraint: true,
    foreignKey: 'funcionarioId'
})

module.exports = PaymentVoucher