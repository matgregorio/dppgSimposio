const jwt = require("jsonwebtoken")

const createParticipanteToken = async(participante, req, res) =>{
    const token = jwt.sign({
        id: participante._id,
        nome: participante.nome
    },"nossosecret")

    //return token
    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        participanteId: participante._id
    })
}

module.exports = createParticipanteToken