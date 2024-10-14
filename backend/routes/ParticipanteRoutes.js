const router = require('express').Router()
const ParticipanteController = require('../controllers/ParticipanteController')

router.post('/registrar', ParticipanteController.registrar)

module.exports = router