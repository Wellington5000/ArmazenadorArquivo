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

router.get('/', authMiddleware, async (req, res) => {
    try {
        var empresa = await Empresa.findAll({ where: { id: req.cookies.empresaId } })
        global.filiais = await Filial.findAll({where: {EmpresaId: empresa[0].id}})
        
        res.render('includes/TelaInicial', { filiais: filiais, isAdmin: isAdmin })
    } catch (error) {
        res.render('includes/TelaLogin', { mensagem: 'Faça login para continuar' + error, notLogon: true })
    }
})

router.get('/login', (req, res) => {
    res.render('includes/TelaLogin', { notLogon: true, nome_empresa: "Armazenador de Arquivos" })
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
        return res.render('includes/TelaLogin', { notLogon: true, mensagem: "Usuário ou senha inválidos" })
    }
    if (!await bcrypt.compare(senha, result[0].senha)) {
        console.log('Senha incorreta')
        return res.render('includes/TelaLogin', { notLogon: true, mensagem: "Usuário ou senha inválidos" })
    }

    global.isAdmin = result[0].isAdmin

    //Expiração em 10 dias
    res.cookie('token', gerateToken({ id: result.id }), { maxAge: 900000000, httpOnly: true })
    res.cookie('id', result[0].id)
    res.cookie('empresaId', result[0].empresaId)
    res.redirect('/')
})


router.get('/sair', (req, res) => {
    nome_empresa = "Armazenador de Arquivos"
    res.cookie('token', undefined)
    res.redirect('/login')
})

module.exports = router
