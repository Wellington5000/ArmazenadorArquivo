const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const app = express()
const router = express.Router()

const authMiddleware = require('../authMiddleware')
const upload = require('../multer')

const Database = require('../models/database')
const Empresa = require('../models/company')
const Funcionario = require('../models/employee')
const Filial = require('../models/branch')

const Alvara = require('../models/documents/license')
const Comprovante = require('../models/documents/payment_voucher')
const Contrato = require('../models/documents/contract')
const Fatura = require('../models/documents/invoice')
const NotaFiscal = require('../models/documents/note')

//Body-Parser permite a obtenção dos dados do formulário
app.use(express.json())
app.use(express.urlencoded({extended: true}))

router.get('/cadastrar_empresa', authMiddleware, async (req, res) => {
    try {
        await Empresa.create({
            razao_social: 'Ferro Norte',
            cnpj: '42.315.628/0801.73',
            endereco: 'Bairro Vamos Ver o Sol, 4656 - Longe',
            cidade: 'Teresina',
            estado: 'Piauí'
        })

        res.render('includes/index', {mensagem: "Empresa cadastrada com sucesso"})
    } catch (error) {
        res.render('includes/index', {mensagem: "Erro ao cadastrar empresa"})
    }
})

router.get('/cadastrar_funcionario', async (req, res) => {
    try {
        const hash = await bcrypt.hash('654321', 10)
        await Funcionario.create({
            nome: 'Cleiton Neres',
            cargo: 'Analista',
            data_nascimento: '1999/01/31',
            email: 'cleiton@gmail.com',
            senha: hash,
            filialId: 1,
            empresaId: 2
        })

        res.render('includes/index', {mensagem: "Funcionário cadastrado"})
    } catch (error) {
        res.render('includes/index', {mensagem: "Erro ao cadastrar funcionário" + error})
    }
})

router.get('/cadastrar_filial', async (req, res) => {
    try {
        await Filial.create({
            codigo: 1,
            razao_social: 'Ferro Norte Filial',
            cnpj: '12.345.678/0008.43',
            endereco: 'R. Generoso França, 866 - Pedras',
            cidade: 'Teresina',
            estado: 'Piauí',
            companyId: 2
        })

        res.render('includes/index', { mensagem: 'Filial cadastrada' })
    } catch (error) {
        res.render('includes/index', { mensagem: 'Erro ao cadastrar filial' + error})
    }
})

router.post('/alvara', upload.single('diretorio'), authMiddleware, async (req, res) => {
    var funcionario = await Funcionario.findAll({where: {id: req.cookies.id}})
    
    //await Database.sync();
    try {
        await Alvara.create({
            num_alvara: req.body.num_alvara,
            cnpj: req.body.cnpj,
            data_emissao: req.body.data_emissao,
            data_validade: req.body.data_validade,
            diretorio: req.file.originalname,
            funcionarioId: funcionario[0].id,
            empresaId: funcionario[0].empresaId
        })

        console.log(await Alvara.findAll())

        res.render('includes/FormInsert', { mensagem: "Arquivo inserido com sucesso" })
    } catch (error) {
        res.render('includes/FormInsert', { mensagem: "Erro ao salvar o arquivo" })
    }
})

router.post('/comprovante', upload.single('diretorio'), authMiddleware, async (req, res) => {
    var funcionario = await Funcionario.findAll({where: {id: req.cookies.id}})

    //await Database.sync();
    try {
        await Comprovante.create({
            nome_beneficiario: req.body.nome_beneficiario,
            cpf_cnpj_beneficiario: req.body.cpf_cnpj_beneficiario,
            nome_pagador: req.body.nome_pagador,
            cpf_cnpj_pagador: req.body.cpf_cnpj_pagador,
            data_pagamento: req.body.data_pagamento,
            diretorio: req.file.originalname,
            funcionarioId: funcionario[0].id,
            empresaId: funcionario[0].empresaId
        })

        res.render('includes/FormInsert', { mensagem: "Arquivo inserido com sucesso" })
    } catch (error) {
        res.render('includes/FormInsert', { mensagem: "Erro ao salvar o arquivo" })
    }
})

router.post('/contrato', upload.single('diretorio'), authMiddleware, async (req, res) => {
    var funcionario = await Funcionario.findAll({where: {id: req.cookies.id}})

    //await Database.sync();
    try {
        await Contrato.create({
            cnpj_empregador: req.body.cnpj_empregador,
            nome_empregado: req.body.nome_empregado,
            cpf_empregado: req.body.cpf_empregado,
            cargo: req.body.cargo,
            diretorio: req.file.originalname,
            funcionarioId: funcionario[0].id,
            empresaId: funcionario[0].empresaId
        })

        res.render('includes/FormInsert', { mensagem: "Arquivo inserido com sucesso" })
    } catch (error) {
        res.render('includes/FormInsert', { mensagem: "Erro ao salvar o arquivo" })
    }
})

router.post('/fatura', upload.single('diretorio'), authMiddleware, async (req, res) => {
    var funcionario = await Funcionario.findAll({where: {id: req.cookies.id}})

    try {
        await Fatura.create({
            num_fatura: req.body.num_fatura,
            data_emissao: req.body.data_emissao,
            data_vencimento: req.body.data_vencimento,
            diretorio: req.file.originalname,
            funcionarioId: funcionario[0].id,
            empresaId: funcionario[0].empresaId
        })

        res.render('includes/FormInsert', { mensagem: "Arquivo inserido com sucesso" })
    } catch (error) {
        res.render('includes/FormInsert', { mensagem: "Erro ao salvar o arquivo" })
    }
})

router.post('/nota_fiscal', upload.single('diretorio'), authMiddleware, async (req, res) => {
    var funcionario = await Funcionario.findAll({where: {id: req.cookies.id}})

    try {
        await NotaFiscal.create({
            cod_filial: req.body.cod_filial,
            num_nota: req.body.num_nota,
            cod_cliente: req.body.cod_cliente,
            num_pedido: req.body.num_pedido,
            diretorio: req.file.originalname,
            funcionarioId: funcionario[0].id,
            empresaId: funcionario[0].empresaId
        })

        res.render('includes/FormInsert', { mensagem: "Arquivo inserido com sucesso" })
    } catch (error) {
        res.render('includes/FormInsert', { mensagem: "Erro ao salvar o arquivo" })
    }
})

module.exports = router