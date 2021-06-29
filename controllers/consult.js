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
const authMiddleware = require('../authMiddleware')

//Body-Parser permite a obtenção dos dados do formulário
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const Op = Sequelize.Op

router.post('/alvara', authMiddleware, async (req, res) => {
    const cabecalho = ['Nº Alvará', 'CNPJ', 'Data Emissão', 'Data Validade', 'Arquivo', 'Ações'];
    //await Alvara.destroy({ truncate : true, cascade: false })
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
        result[index].data2 = false;
        result[index].data3 = true;
        result[index].data4 = true;
        result[index].dataValues = '';
        result[index]._previousDataValues = ''
        result[index]._options = ''
    })

    res.render('includes/Consult', { result: result, cabecalho: cabecalho })
})

router.post('/comprovante', authMiddleware, async (req, res) => {
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
        result[index].data2 = false;
        result[index].data3 = false;
        result[index].data4 = true;
        result[index].dataValues = '';
        result[index]._previousDataValues = ''
        result[index]._options = ''
    })

    res.render('includes/Consult', { result: result, cabecalho: cabecalho })
})

router.post('/contrato', authMiddleware, async (req, res) => {
    const cabecalho = ['CPF/CNPJ Empregador', 'Nome Empregado', 'CPF Empregado', 'Cargo', 'Arquivo', 'Ações'];

    var result = await Contrato.findAll({
        where: {
            cnpj_empregador: { [Op.like]: req.body.cnpj_empregador + '%' },
            nome_empregado: { [Op.like]: req.body.nome_empregado + '%' },
            cpf_empregado: { [Op.like]: req.body.cpf_empregado + '%' },
            cargo: { [Op.like]: req.body.cargo + '%' }
        }
    })
    
    result.map((item, index) => {
        result[index].campo1 = item.cnpj_empregador;
        result[index].campo2 = item.nome_empregado;
        result[index].campo3 = item.cpf_empregado;
        result[index].campo4 = item.cargo;
        result[index].campo5 = item.diretorio;
        result[index].data2 = false;
        result[index].data3 = false;
        result[index].data4 = false;
        result[index].dataValues = '';
        result[index]._previousDataValues = ''
        result[index]._options = ''
    })

    res.render('includes/Consult', { result: result, cabecalho: cabecalho })
})

router.post('/fatura', authMiddleware, async (req, res) => {
    const cabecalho = ['Nº Fatura', 'Data Emissão', 'Data Vencimento', '', 'Arquivo', 'Ações'];

    (req.body.data_emissao) ? dataValidaEmissao = new Date(req.body.data_emissao + ' ' + '21:00:00') : dataValidaEmissao = { [Op.between]: [new Date("02 01 1999"), new Date("02 01 2050")] };
    (req.body.data_vencimento) ? dataValidaVencimento = new Date(req.body.data_vencimento + ' ' + '21:00:00') : dataValidaVencimento = { [Op.between]: [new Date("02 01 1999"), new Date("02 01 2050")] };
    
    var result = await Fatura.findAll({
        where: {
            num_fatura: { [Op.like]: req.body.num_fatura + '%' },
            data_emissao: dataValidaEmissao,
            data_vencimento: dataValidaVencimento
        }
    })

    result.map((item, index) => {
        result[index].campo1 = item.num_fatura;
        result[index].campo2 = item.data_emissao;
        result[index].campo3 = item.data_vencimento;
        result[index].campo5 = item.diretorio;
        result[index].data2 = true;
        result[index].data3 = true;
        result[index].data4 = false;
        result[index].dataValues = '';
        result[index]._previousDataValues = ''
        result[index]._options = ''
    })

    res.render('includes/Consult', { result: result, cabecalho: cabecalho })
})

router.post('/nota_fiscal', authMiddleware, async (req, res) => {
    const cabecalho = ['Cod Filial', 'Nº Nota', 'Cod Cliente', 'Nº Pedido', 'Arquivo', 'Ações'];
    
    var result = await NotaFiscal.findAll({
        where: {
            cod_filial: { [Op.like]: req.body.cod_filial + '%' },
            num_nota: { [Op.like]: req.body.num_nota + '%' },
            cod_cliente: { [Op.like]: req.body.cod_cliente + '%' },
            num_pedido: { [Op.like]: req.body.num_pedido + '%' }
        }
    })

    result.map((item, index) => {
        result[index].campo1 = item.cod_filial;
        result[index].campo2 = item.num_nota;
        result[index].campo3 = item.cod_cliente;
        result[index].campo4 = item.num_pedido;
        result[index].campo5 = item.num_pedido;
        result[index].data2 = false;
        result[index].data3 = false;
        result[index].data4 = false;
        result[index].dataValues = '';
        result[index]._previousDataValues = ''
        result[index]._options = ''
    })

    res.render('includes/Consult', { result: result, cabecalho: cabecalho })
})

module.exports = router