const express = require('express')
const bodyParser = require('body-parser')
const upload = require('./multer')
const handlebars = require('express-handlebars')
const path = require('path')
const app = express()
const project = require('./controllers/project')
const newDocument = require('./controllers/newDocument')
const Consult = require('./controllers/consult')
const moment = require('moment')

//Body-Parser permite a obtenção dos dados do formulário
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Configuração handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main', helpers: {
  formatDate: (date) => {
      return moment(date).format('DD/MM/YYYY')
  }
}}))
app.set('view engine', 'handlebars')

//Carrega a estilização e as imagens
app.use(express.static(path.join(__dirname, './images/')))
app.use(express.static(path.join(__dirname, './uploads/')))
app.use(express.static(path.join(__dirname, './views/style/')))
app.use(express.static(path.join(__dirname, './views/scripts')))

app.use('/', project)
app.use('/novo', newDocument)
app.use('/consultar', Consult)

app.listen(3000);