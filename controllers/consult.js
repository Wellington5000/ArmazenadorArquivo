const express = require('express')
const bodyParser = require('body-parser')
const upload = require('../multer')
const app = express()
const moment = require('moment')
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
const Sequelize = require('sequelize')

//Body-Parser permite a obtenção dos dados do formulário
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const Op = Sequelize.Op

router.post('/alvara', async (req, res) => {
    const cabecalho = ['Nº Alvará', 'CNPJ', 'Data Emissão', 'Data Validade', 'Arquivo', 'Ações'];
    
    (req.body.data_emissao) ? dataValidaEmissao = req.body.data_emissao : dataValidaEmissao = { [Op.between]: [new Date("02 01 1999"), new Date("02 01 2050")] };
    (req.body.data_validade) ? dataValidaValidade = req.body.data_validade : dataValidaValidade = { [Op.between]: [new Date("02 01 1999"), new Date("02 01 2050")] };
    
    var result = await Alvara.findAll({
        where: {
            num_alvara: { [Op.like]: req.body.num_alvara + '%' },
            cnpj: { [Op.like]: req.body.cnpj + '%' },
            data_emissao: dataValidaEmissao,
            data_validade: dataValidaValidade
        }
    })
    
    result.map((item, index) => {
        result[index].campo1 = item.num_alvara;
        result[index].campo2 = item.cnpj;
        result[index].campo3 = item.data_emissao;
        result[index].campo4 = item.data_validade;
        result[index].campo5 = item.diretorio;
        result[index].dataValues = true;
        result[index]._previousDataValues = ''
        result[index]._options = ''
    })

    res.render('includes/Consult', { result: result, cabecalho: cabecalho})
})

router.post('/comprovante', async (req, res) => {
    const cabecalho = ['CPF/CNPJ Beneficiário', 'Nome Pagador', 'CPF/CNPJ Pagador', 'Data Pagamento', 'Arquivo', 'Ações'];
    (req.body.data_pagamento) ? dataValidaPagamento = req.body.data_pagamento : dataValidaPagamento = { [Op.between]: [new Date("02 01 1999"), new Date("02 01 2050")] };

    var result = await Comprovante.findAll({
        where: {
            cpf_cnpj_beneficiario: { [Op.like]: req.body.cpf_cnpj_beneficiario + '%' },
            nome_pagador: { [Op.like]: req.body.nome_pagador + '%' },
            cpf_cnpj_pagador: { [Op.like]: req.body.cpf_cnpj_pagador + '%' },
            data_pagamento: dataValidaPagamento
        }
    })

    result.map((item, index) => {
        result[index].campo1 = item.cpf_cnpj_beneficiario;
        result[index].campo2 = item.nome_pagador;
        result[index].campo3 = item.cpf_cnpj_pagador;
        result[index].campo4 = item.data_pagamento;
        result[index].campo5 = item.diretorio;
        result[index].dataValues = '';
        result[index]._previousDataValues = ''
        result[index]._options = ''
    })

    res.render('includes/Consult', { result: result, cabecalho: cabecalho})
})

router.post('/contrato', async (req, res) => {
    const cabecalho = ['CPF/CNPJ Empregador', 'Nome Empregado', 'CPF Empregado', 'Cargo', 'Arquivo', 'Ações'];

    var result = await Contrato.findAll({
        where: {
            cnpj_empregador: { [Op.like]: req.body.cnpj_empregador + '%' },
            nome_empregado: { [Op.like]: req.body.nome_empregado + '%' },
            cpf_empregado: { [Op.like]: req.body.cpf_empregado + '%' },
            cargo: { [Op.like]: req.body.cargo + '%' }
        }
    })
    console.log(result)
    result.map((item, index) => {
        result[index].campo1 = item.cnpj_empregador;
        result[index].campo2 = item.nome_empregado;
        result[index].campo3 = item.cpf_empregado;
        result[index].campo4 = item.cargo;
        result[index].campo5 = item.diretorio;
        result[index].dataValues = '';
        result[index]._previousDataValues = ''
        result[index]._options = ''
    })

    res.render('includes/Consult', { result: result, cabecalho: cabecalho})
})

router.post('/fatura', async (req, res) => {
    await Database.sync();
    await Fatura.create({
        num_fatura: req.body.num_alvara,
        data_emissao: req.body.data_emissao,
        data_vencimento: req.body.data_vencimento,
        valor: req.body.valor,
        diretorio: req.file.originalname
    })

    res.redirect('/novo', { success: true })
})

router.post('/nota_fiscal', async (req, res) => {
    await NotaFiscal.create({
        cod_filial: req.body.cod_filial,
        num_nota: req.body.num_nota,
        cod_cliente: req.body.cod_cliente,
        num_pedido: req.body.num_pedido,
        cpf_cnpj: req.body.cpf_cnpj,
        data_emissao: req.body.data_emissao,
        diretorio: req.file.originalname
    })

    res.redirect('/novo', { success: true })
})

module.exports = router