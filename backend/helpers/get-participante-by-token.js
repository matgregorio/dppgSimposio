const jwt = require('jsonwebtoken')

const Participante = require("../models/Participante")

//get participante by jwt token

const getParticipanteByToken = async (token) => {

    if(!token){
        return res.status(401).json({message: 'Acesso negado! Token não encontrado!'})
    }
    const decoded = jwt.verify(token, "nossosecret")    

    const participanteId = decoded._id

    const participante = await Participante.findOne({_id: participanteId})

    return participante
}

module.exports = getParticipanteByToken