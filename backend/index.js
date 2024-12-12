const express = require('express')
const cors = require('cors')

const app = express()

//config json responde
app.use(express.json())

//Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))

app.use(express.static('public'))

//routes
//rotas de usuário
const ParticipanteRoutes = require('./routes/ParticipanteRoutes')
app.use('/participante', ParticipanteRoutes)

app.listen(5000)


