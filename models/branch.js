const Database = require('./database')
const Sequelize = require('sequelize')
const Company = require('./company')

const Branch = Database.define('filial', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    razao_social: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cnpj: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Branch.belongsTo(Company, {
    constraint: true,
    foreingKey: 'CompanyId'
})

module.exports = Company