const express = require('express')
const router = express.Router()
const Funcionario = require('../models/employee')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    res.render('includes/index', { success: false })
})

router.get('/novo', (req, res) => {
    res.render('includes/FormNotaFiscal', { success: req.params.valid })
})

router.get('/consultar', (req, res) => {
    res.render('includes/Consult', { texto: 'Wellington' })
})


router.get('/login', (req, res) => {
    res.render('includes/formLogin')
})

router.post('/autenticacao', async (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    var result = await Funcionario.findAll({ where: {email: email}})
   
    if (!result[0]) {
        console.log('Nenhum usuário encontrado')
        return res.redirect('/login')
    }

    if (!await bcrypt.compare(senha, result[0].senha)) {
        console.log('Senha incorreta')
        return res.redirect('/')
    }

    console.log('Logado com sucesso')
})
module.exports = router
