const express = require('express')
const router = express.Router()
const Funcionario = require('../models/employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../auth.json')
const authMiddleware = require('../authMiddleware')


router.get('/', authMiddleware, async (req, res) => {
    res.render('includes/index', { success: false })
})

router.get('/novo', authMiddleware, (req, res) => {
    res.render('includes/FormInsert')
})

router.get('/consultar', authMiddleware, (req, res) => {
    res.render('includes/FormConsult', { texto: 'Wellington' })
})


router.get('/login', (req, res) => {
    res.render('includes/FormLogin')
})

//---------------------------------------------------------------------------
function gerateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 86400 })
}

router.post('/autenticacao', async (req, res) => {
    const email = req.body.email
    const senha = req.body.senha

    var result = await Funcionario.findAll({ where: { email: email } })

    if (!result[0]) {
        return res.render('includes/FormLogin', {mensagem: "Usuário ou senha inválidos"})
    }
    if (!await bcrypt.compare(senha, result[0].senha)) {
        console.log('Senha incorreta')
        return res.render('includes/FormLogin', {mensagem: "Usuário ou senha inválidos"})
    }
  //Expiração em 10 dias
  res.cookie('token', gerateToken({id: result.id}), { maxAge: 900000000, httpOnly: true })
  res.redirect('/')
})


router.get('/sair', (req, res) => {
    res.cookie('token', undefined)
    res.redirect('/login')
})
module.exports = router
