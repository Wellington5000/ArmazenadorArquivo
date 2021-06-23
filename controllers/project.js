const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('includes/index')
})

router.get('/home', (req, res) => {
    res.render('includes/FormNotaFiscal')
})

router.get('/consult', (req, res) => {
    res.render('includes/Consult')
})

module.exports = router
