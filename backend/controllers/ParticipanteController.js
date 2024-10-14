const Participante = require('../models/Participante')
const bcrypt = require('bcrypt')

module.exports = class ParticipanteController{
    static async registrar(req,res){
        const {cpf, senha, confirmarSenha,nome,email,telefone} = req.body
        //validações
        //Fazer para todos os campos
        if(!cpf){
            res.status(422).json({message:'O campo CPF é obrigatório'})
            return
        }

        //Verificar se campos de senha e confirmar senha são iguais
        if(senha !== confirmarSenha){
            res.status(422).json({message:'Os campos de senha e confirmar senha precisam ser iguais'})
        }
        //Verificar cpf unico
        const verificaCpf = await Participante.findOne({cpf: cpf})
        if(verificaCpf){
            res.status(422).json({message:'CPF já utilizado!'})
            return
        }
        //verificar se cpf é válido
        //Verificar email unico
        //verificar se email é válido

        //criando a senha
        const novaSenha = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(novaSenha, senha)
        //criando participante
        const participante = new Participante({
            cpf,
            senha: senhaHash,//passando senha criptografada
            nome,
            email,
            telefone,
        })

        try{
            const novoParticipante = await participante.save()
            res.status(201).json({
                message: 'Participante criado com sucesso!',
                novoParticipante
            })
        }catch(error){
            res.status(500).json({message: error})
        }
    }
}