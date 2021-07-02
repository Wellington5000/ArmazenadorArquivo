const Database = require('./database')
const Sequelize = require('sequelize')
const Filial = require('./branch')
const Empresa = require('./company')

const Employee = Database.define('Funcionario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    cargo: {
        type: Sequelize.STRING,
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Employee.belongsTo(Filial, {
    constraint: true,
    foreignKey: 'filialId',
    allowNull: false
})

Employee.belongsTo(Empresa, {
    constraint: true,
    foreignKey: 'empresaId',
    allowNull: false
})

module.exports = Employee