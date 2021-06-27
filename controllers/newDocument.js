const express = require('express')
const bodyParser = require('body-parser')
const upload = require('../multer')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt')
const Database = require('../models/database')
const Empresa = require('../models/company')
const Funcionario = require('../models/employee')
const Filial = require('../models/branch')
const Document = require('../models/document')

const Alvara = require('../models/documents/license')
const Comprovante = require('../models/documents/payment_voucher')
const Contrato = require('../models/documents/contract')
const Fatura = require('../models/documents/invoice')
const NotaFiscal = require('../models/documents/note')

//Body-Parser permite a obtenção dos dados do formulário
app.use(express.json())
app.use(express.urlencoded())

router.post('/cadastrar_empresa', async (req, res) => {
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
    await Funcionario.create({
        nome: 'Wellington dos Santos Teixeira',
        cargo: 'Estagiário TI',
        data_nascimento: '1999/01/31',
        email: 'wellingtonsantos5000@gmail.com',
        senha: hash,
        companyId: 1
    })
})

router.get('/cadastrar_filial', async (req, res) => {
    await Filial.create({
        id: 99,
        razao_social: 'Todas',
        cnpj: '12.345.678/0001.23',
        endereco: 'R. Generoso França, 866 - Pedras',
        cidade: 'Teresina',
        estado: 'Piauí',
        companyId: 1
    })
})

router.post('/alvara', upload.single('diretorio'), async (req, res) => {
    //await Database.sync();
    await Alvara.create({
        num_alvara: req.body.num_alvara,
        cnpj: req.body.cnpj,
        data_emissao: req.body.data_emissao,
        data_validade: req.body.data_validade,
        diretorio: req.file.originalname
    })

    res.redirect('/novo')
})

router.post('/comprovante', upload.single('diretorio'), async (req, res) => {
    //await Database.sync();
    await Comprovante.create({
        nome_beneficiario: req.body.nome_beneficiario,
        cpf_cnpj_beneficiario: req.body.cpf_cnpj_beneficiario,
        nome_pagador: req.body.nome_pagador,
        cpf_cnpj_pagador: req.body.cpf_cnpj_pagador,
        data_pagamento: req.body.data_pagamento,
        diretorio: req.file.originalname
    })
    
    res.redirect('/novo')
})

router.post('/contrato', upload.single('diretorio'), async (req, res) => {
    //await Database.sync();
    await Contrato.create({
        cnpj_empregador: req.body.cnpj_empregador,
        nome_empregado: req.body.nome_empregado,
        cpf_empregado: req.body.cpf_empregado,
        cargo: req.body.cargo,
        diretorio: req.file.originalname
    })

    res.redirect('/novo')
})

router.post('/fatura', upload.single('diretorio'), async (req, res) => {
    //await Database.sync();
    await Fatura.create({
        num_fatura: req.body.num_alvara,
        data_emissao: req.body.data_emissao,
        data_vencimento: req.body.data_vencimento,
        valor: req.body.valor,
        diretorio: req.file.originalname
    })

    res.redirect('/novo')
})

router.post('/nota_fiscal', upload.single('diretorio'), async (req, res) => {
    await NotaFiscal.create({
        cod_filial: req.body.cod_filial,
        num_nota: req.body.num_nota,
        cod_cliente: req.body.cod_cliente,
        num_pedido: req.body.num_pedido,
        cpf_cnpj: req.body.cpf_cnpj,
        data_emissao: req.body.data_emissao,
        diretorio: req.file.originalname
    })

    res.redirect('/novo')
})

router.post('/teste', upload.single('diretorio'), (req, res) => {
    var filial = req.file.originalname
    console.log(filial)
    res.redirect('/novo')
})

module.exports = router