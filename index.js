const express = require('express')
const bodyParser = require('body-parser')
const upload = require('./multer')
const handlebars = require('express-handlebars')
const path = require('path')

const app = express()

//Body-Parser permite a obtenção dos dados do formulário
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Configuração handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main', helpers: {
  formatDate: (date) => {
      return moment(date).format('YYYY-MM-DD')
  }
}}))
app.set('view engine', 'handlebars')

//Carrega a estilização e as imagens
app.use(express.static(path.join(__dirname, './images/')))
app.use(express.static(path.join(__dirname, './uploads/')))
app.use(express.static(path.join(__dirname, './views/style/')))
app.use(express.static(path.join(__dirname, './views/scripts')))

app.get('/', (req, res) => {
    res.render('includes/index')
})

app.get('/login', (req, res) => {
    res.render('includes/FormLogin')
})

app.get('/home', (req, res) => {
    res.render('includes/FormNotaFiscal')
})

app.post('/teste', upload.single('arquivo'), (req, res) => {
    console.log(req.body, req.body.nome, req.body.arquivo, req.body.cargo)
    res.redirect('/')
})

app.listen(3000);