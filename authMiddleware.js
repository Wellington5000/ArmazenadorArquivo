const jwt = require('jsonwebtoken')
const authConfig = require('./auth.json')

module.exports = async (req, res, next) => {
    var token = req.cookies.token

    //Verifica se o token está vaazio  
    if (!token) { return res.redirect('/login') }

    //Verifica se o token é válido
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) { return res.render('includes/TelaLogin', {mensagem: "Faça login novamente para continuar"}) }
        req.userId = decoded.id
        return next()
    })

}