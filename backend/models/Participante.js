const mongoose = require('../db/conn');
const { Schema } = mongoose;
const mongooseDelete = require('mongoose-delete');

const ParticipanteSchema = new Schema({
    id_participante: {
        type: Number,
        required: true,
        unique: true,
    },
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
    id_tipo_participante: {
        type: Schema.Types.ObjectId,
        ref: 'TipoParticipante',
        required: true,
    },
    id_tipo_iniciacao: {
        type: Schema.Types.ObjectId,
        ref: 'TipoIniciacao',
        required: true,
    },
    id_curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true,
    },
    campus: {
        type: String,
        required: true,
    },
    id_departamento: {
        type: Schema.Types.ObjectId,
        ref: 'Departamento',
        required: true,
    },
    id_sub_area: {
        type: Schema.Types.ObjectId,
        ref: 'SubArea',
        required: true,
    },
}, { timestamps: true });

// Adiciona o plugin mongoose-delete para soft delete
ParticipanteSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

const Participante = mongoose.model('Participante', ParticipanteSchema);

module.exports = Participante;
