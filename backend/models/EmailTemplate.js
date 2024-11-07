const mongoose = require('../db/conn');
const {Schema} = mongoose;
const mongooseDelete = require('mongoose-delete')
const moment = require('moment-timezone');

const EmailTemplateSchema = new Schema({
    nome:{
        type: String,
        required: true,
    },
    assunto:{
        type: String,
        required: true,
    },
    texto:{
        type:String,
        required: true,
    },
}, {timestamps: true});
EmailTemplateSchema.set('toJSON',{
    transform: (doc,ret) => {
        ret.createdAt = moment(ret.createdAt).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
        ret.updatedAt = moment(ret.updatedAt).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
        return ret;
    }
})

EmailTemplateSchema.plugin(mongooseDelete, {deletedAt:true, overrideMethods: 'all'});

const EmailTemplate = mongoose.model('EmailTemplate', EmailTemplateSchema);

module.exports = EmailTemplate;