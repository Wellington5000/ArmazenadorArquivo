const Sequelize = require('sequelize')

//mysql://z677qg4io4836uwg:lge4ly06i0u2wb3o@phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/kboqzhtqvsidxpv9
const sequelize = new Sequelize('kboqzhtqvsidxpv9', 'z677qg4io4836uwg', 'lge4ly06i0u2wb3o', {
  host: 'phtfaw4p6a970uc0.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialectOptions: {
    useUTC: false     // para considerar a hora da consulta como a hora                  // local, logo nao soma +02:00 horas
   },
  dialect: 'mysql',
  timezone: '-03:00'
})

module.exports = sequelize