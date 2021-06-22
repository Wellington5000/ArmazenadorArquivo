const Database = require('./database')
const Sequelize = require('sequelize')
const Company = require('./company')

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
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Employee.belongsTo(Company, {
    constraint: true, 
    foreignKey: 'companyId'
});

//Employee.sync()

module.exports = Employee