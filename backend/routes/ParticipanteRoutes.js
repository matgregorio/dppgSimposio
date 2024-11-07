const router = require('express').Router()
const ParticipanteController = require('../controllers/ParticipanteController')

//middleware
const verifyToken = require('../helpers/verify-token')

router.post('/registrar', ParticipanteController.registrar)
router.post('/login', ParticipanteController.login)
router.get('/checkParticipante/:id', ParticipanteController.checkParticipante)
router.get('/:id', ParticipanteController.getParticipanteById)
router.patch('/editar/:id',verifyToken, ParticipanteController.editarParticipante)

module.exports = router