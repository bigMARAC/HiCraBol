const express = require('express')
const cors = require('cors')
const routes = require('./routes')

require('./database')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + 'uplodas'))
app.use(routes)

app.listen(3351)

console.log('Aplicação sendo executada na porta 3351')