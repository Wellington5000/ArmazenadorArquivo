const express = require('express')
const bcrypt = require('bcrypt')
const Database = require('../models/database')
const Empresa = require('../models/company')
const Funcionario = require('../models/employee')
const router = express.Router()

router.post('/cadastrar_empresa', async (req, res) => {
    await Database.sync();
    await Empresa.create({
        razao_social: 'Agroserrana Distribuidora de Produtos Agropecuários',
        cnpj: '12.345.678/0001.23',
        endereco: 'Av. Prefeito Wall Ferraz, 4656 - Triunfo',
        cidade: 'Teresina',
        estado: 'Piauí'
    })
})

router.get('/cadastrar_funcionario', async (req, res) => {
    const hash = await bcrypt.hash('Qmj#3p@52', 10)
    //await Funcionario.sync({force: true})
    await Funcionario.create({
        nome: 'Wellington dos Santos Teixeira',
        cargo: 'Estagiário TI',
        data_nascimento: '1999/01/31',
        email: 'wellingtonsantos5000@gmail.com',
        senha: hash,
        companyId: 1
    })
})

router.get('/', async (req, res) => {
    var result = await Funcionario.findAll()
    for(let i = 0; i < result.length; i++){
        console.log(result[i].id, result[i].nome, result[i].data_nascimento, result[i].companyId, result[i].email, result[i].senha)
    }
    res.render('includes/index')
})

router.get('/home', (req, res) => {
    res.render('includes/FormNotaFiscal')
})

router.get('/consult', (req, res) => {
    res.render('includes/Consult')
})

module.exports = router
