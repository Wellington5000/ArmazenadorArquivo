const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('includes/index', {success: false})
})

router.get('/novo', (req, res) => {
    console.log(req.params.valid)
    res.render('includes/FormNotaFiscal', {success: req.params.valid})
})

router.get('/consultar', (req, res) => {
    res.render('includes/Consult', {texto: 'Wellington'})
})

module.exports = router
