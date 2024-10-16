const mongoose = require('../db/conn');
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete');
const moment = require('moment-timezone');

const ParticipanteSchema = new Schema({
    cpf: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    tipoParticipante:{
        type: Number,
        required: true,
    }
}, { timestamps: true });
ParticipanteSchema.set('toJSON',{
    transform: (doc, ret) => {
        ret.createdAt = moment(ret.createdAt).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
        ret.updatedAt = moment(ret.updatedAt).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
        return ret;
    }
})
// Adiciona o plugin mongoose-delete para soft delete
ParticipanteSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Participante = mongoose.model('Participante', ParticipanteSchema);

module.exports = Participante;
