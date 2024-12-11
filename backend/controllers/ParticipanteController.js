const Participante = require('../models/Participante')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {cpf: cpfValidator} = require('cpf-cnpj-validator')

//helpers
const createParticipanteToken = require('../helpers/create-participante-token')
const getToken = require('../helpers/get-token')
const getParticipanteByToken = require('../helpers/get-participante-by-token')

module.exports = class ParticipanteController{
    static async registrar(req,res){
        const {cpf, senha, confirmarSenha,nome,email,telefone,tipoParticipante} = req.body
        //validações
        //Verificar se CPF foi preenchido
        if(!cpf){
            res.status(422).json({message:'O campo CPF é obrigatório'})
            return
        }

        //Verificar se o email foi preenchido
        if(!email){
            res.status(422).json({message: 'O campo EMAIL é obrigatório'})
            return
        }

        //Verificar se a senha foi preenchida
        if(!senha){
            res.status(422).json({message: 'O campo SENHA é obrigatório'})
            return
        }

        //Verificar se a confirmação de senha foi preenchido
        if(!confirmarSenha){
            res.status(422).json({message: 'O campo CONFIRMAR SENHA é obrigatório'})
        }


        //Verificar se campos de senha e confirmar senha são iguais
        if(senha !== confirmarSenha){
            res.status(422).json({message:'Os campos de senha e confirmar senha precisam ser iguais'})
            return
        }

        //verificar se tipo de participante foi preenchido
        if(!tipoParticipante){
            res.status(422).json({message:'O campo TIPO DE PARTICIPANTE é obrigatório'})
            return
        }

        //Verificar cpf unico
        const verificaCpf = await Participante.findOne({cpf: cpf})
        if(verificaCpf){
            res.status(422).json({message:'CPF já utilizado!'})
            return
        }
        //verificar se cpf é válido
        if(!cpfValidator.isValid(cpf)){
            res.status(422).json({message: 'O CPF fornecido não é válido'});
            return
        }

        //Verificar email unico
        const verificaEmail = await Participante.findOne({email : email})
        if(verificaEmail){
            res.status(422).json({message:'EMAIL já utilizado!'})
            return
        }

        //Verificar se telefone foi preenchido
        if(!telefone){
            res.status(422).json({message:'O campo TELEFONE é obrigatório'})
            return
        }

        //Verificar nome
        if(!nome){
            res.status(422).json({message:'O campo NOME é obrigatório'})
            return
        }

        //criando a senha
        const novaSenha = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.hash(senha, novaSenha)
        const anoAtual = new Date().getFullYear();
        //criando participante
        const participante = new Participante({
            cpf,
            senha: senhaHash,//passando senha criptografada
            nome,
            email,
            telefone,
            tipoParticipante,
            ano: anoAtual
        })

        try{
            const novoParticipante = await participante.save()
            await createParticipanteToken(novoParticipante, req, res)
        }catch(error){
            res.status(500).json({message: error})
        }
    }

    static async login(req, res){
        const{cpf,senha} = req.body
        if(!cpf){
            res.status(422).json({message: 'campo CPF obrigatório'})
            return
        }
        if(!senha){
            res.status(422).json({message: 'campo SENHA obrigatório'})
            return
        }
        if(!cpfValidator.isValid(cpf)){
            res.status(422).json({message: 'O CPF fornecido não é válido'});
            return
        }

        const participanteExists = await Participante.findOne({cpf:cpf})
        if(!participanteExists){
            res.status(422).json({
                message: 'Não existe usuário com o CPF cadastrado'
            })
            return
        }

        //verificando se a senha é igual à do bd
        const checkSenha = await bcrypt.compare(senha, participanteExists.senha)
        if(!checkSenha){
            res.status(422).json({
                message: 'Senha inválida!'
            })
            return
        }

        await createParticipanteToken(participanteExists, req, res)
    }
    //se o endereço de id for menor em questão de tamanho, o programa crasha
    static async checkParticipante(req, res){
        let currentParticipante

        console.log(req.headers.authorization)
        if(req.headers.authorization){
                const token = getToken(req)
                const decoded = jwt.verify(token, "nossosecret")
            
                currentParticipante = await Participante.findById(decoded.id).select('-senha')        
        }else{
            currentParticipante = null
        }

        res.status(200).send(currentParticipante)
    }

    static async getParticipanteById(req,res){
        const id = req.params.id

        const participante = await Participante.findById(id).select("-senha")

        if(!participante){
            res.status(422).json({
                message: 'ID inválido. Participante não encontrado'
            })
            return
        }
            res.status(200).json({ participante })


    }

    static async getParticipanteByCpf(req, res){
        const {cpf} = req.params
        
        const participante = await Participante.findOne({cpf}).select("-senha")
        if(!participante){          
            res.status(422).json({
                message: 'CPF inválido. Participante não encontrado'
            })
            return
        }
        res.status(200).json({participante})
    }

    static async editarParticipante(req,res){
        //ATENÇÃO
        //NECESSÁRIO FAZER TODAS AS VERIFICAÇÕES DE CPF, EMAIL E ETC.
        //VERIFICAR SE NÃO TEM EMAIL EM USO NA BASE DE DADOS JÁ FOI UMA ALTERAÇÃO QUE DEU CERTO
        const id = req.params.id
        const {cpf,nome,senha,confirmarSenha,email,telefone} = req.body
        const token = getToken(req)
        const participante = await getParticipanteByToken(token)
        //VALIDAÇÕES DE USUÁRIO - FALTA COMPLETAR
        if(!participante){
            res.status(422).json({
                message: 'Participante não encontrado!',
                participante
            })
            return
        }
        if(!email){
            res.status(422).json({
                message: 'O campo email deve ser preenchido!'
            })
            return
        }
        participante.email = email

        if(!telefone){
            res.status(422).json({
                message: 'O campo telefone deve ser preenchido!'
            })
            return
        }
        participante.telefone = telefone

        
        if(!nome){
            res.status(422).json({
                message: 'O campo nome deve ser preenchido!'
            })
            return
        }
        participante.nome = nome

        if(!senha){
            res.status(422).json({
                message: 'O campo senha deve ser preenchido!'
            })
            return
        }

        if(!confirmarSenha){
            res.status(422).json({
                message: 'O campo de confirmar senha deve ser preenchido!'
            })
            return
        }
        if(senha != confirmarSenha){
            res.status(422).json({
                message: 'As senhas devem conferir!'
            })
            return
        }else if(senha === confirmarSenha && senha != null){
            //criar nova senha para usuário
            const salt = await bcrypt.genSalt(12)
            const senhaHash = await bcrypt.hash(senha, salt)

            participante.senha = senhaHash
        }

        //se o email for igual a um email que já existe, não permite que seja cadastrado
        const emailExists = await Participante.findOne({email:email})
        if(participante.email !== email && emailExists){
            res.status(422).json({
                message: 'Email já cadastrado na base de dados!'
            })
            return
        }

        try{
            //retornando dados atualizados
            await Participante.findOneAndUpdate(
                {_id: participante.id},
                {$set : participante},
                {new: true},
            )
            res.status(200).json({message: 'Participante atualizado com sucesso!'})
        }catch(err){
            res.status(500).json({message: err})
            return 
        }

        
    }
    static async restaurarSenha(req, res){
        const cpf = req.params.cpf

        const participante = await Participante.findByCpf(cpf).select("-senha")
        const idParticipante = participante.id;
        res.status(200).json({idParticipante})
    }
}