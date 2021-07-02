const express = require('express')
const router = express.Router()
const Funcionario = require('../models/employee')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig = require('../auth.json')
const authMiddleware = require('../authMiddleware')
const Database = require('../models/database')
const Filial = require('../models/branch')
const Empresa = require('../models/company')
var nome_empresa = "Armazenador de Arquivos"

router.get('/', authMiddleware, async (req, res) => {
    var empresa = await Empresa.findAll({where: {id: req.cookies.empresaId}})
    nome_empresa = empresa[0].razao_social
    res.render('includes/index', { success: false, nome_empresa: nome_empresa })
})

router.get('/novo', authMiddleware, (req, res) => {
    res.render('includes/FormInsert', {nome_empresa: nome_empresa})
})

router.get('/consultar', authMiddleware, (req, res) => {
    res.render('includes/FormConsult', { texto: 'Wellington', nome_empresa: nome_empresa })
})


router.get('/login', (req, res) => {
    res.render('includes/FormLogin', {notLogon: true, nome_empresa: nome_empresa})
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

    console.log(result)
  //Expiração em 10 dias
  res.cookie('token', gerateToken({id: result.id}), { maxAge: 900000000, httpOnly: true })
  res.cookie('id', result[0].id)
  res.cookie('empresaId', result[0].empresaId)
  res.redirect('/')
})


router.get('/sair', (req, res) => {
    res.cookie('token', undefined)
    res.redirect('/login')
})

module.exports = router
