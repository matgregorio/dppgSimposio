const EmailTemplate = require('../models/EmailTemplate');

module.exports = class EmailTemplateController{
    static async listarTemplates(req,res){
        const {nome,assunto,texto} = req.body
    }

    static async editarTemplate(req,res){
        const id = req.params.id
        const{nome, assunto,texto} = req.body
        //requisição para verificar tipoUsuario
        if(!nome){
            res.status(422).json({message: 'O campo nome é obrigatório'})
        }
        if(!assunto){
            res.status(422).json({message: 'O campo assunto é obrigatório'})
        }
        if(!texto){
            res.status(422).json({message: 'O campo texto é obrigatório'})
        }
        
    }
}