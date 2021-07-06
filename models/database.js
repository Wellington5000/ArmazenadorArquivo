const Sequelize = require('sequelize')

if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const sequelize = new Sequelize(process.env.DATABASE, process.env.SENHA, process.env.AUXILIAR, {
  host: process.env.HOST,
  dialectOptions: {
    useUTC: false     // para considerar a hora da consulta como a hora                  // local, logo nao soma +02:00 horas
   },
  dialect: 'mysql',
  timezone: '-03:00',
  omitNull: true
})

module.exports = sequelize