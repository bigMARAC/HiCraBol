const Aluno = require('./../models/Aluno')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    async read(req, res){
        const alunos = await Aluno.findAll()
        return res.json({ alunos })
    },
    async create(req, res) {
        const { nome, matricula, senha } = req.body
        if (nome && matricula && senha) {
            bcrypt.hash(senha, 10, async (err, hash) => {
                if (!err) {
                    const checkIfExist = await Aluno.findOne({
                        where: { matricula }
                    })
                    if (!checkIfExist) {
                        try {
                            const aluno = await Aluno.create({
                                nome,
                                matricula,
                                senha: hash,
                                token: jwt.sign({ user: matricula }, 'Got a secret?', { expiresIn: 7200 })
                            })

                            return res.status(200).json({
                                id: aluno.id,
                                nome: aluno.nome,
                                matricula: aluno.matricula,
                                token: aluno.token
                            })
                        } catch (error) {
                            return res.status(400).json({ erro: error })
                        }
                    } else {
                        return res.status(401).json({ erro: 'Matrícula em uso' })
                    }
                } else {
                    return res.status(400).json({ erro: err })
                }
            })
        } else {
            return res.status(400).json({ erro: 'Campos inválidos' })
        }
    },

    async auth(req, res) {
        const { matricula, senha } = req.body

        if ( matricula && senha ) {
            const aluno = await Aluno.findOne({
                where: { matricula }
            })
            if( aluno ) {
                const token = jwt.sign({ user: aluno.matricula }, 'Got a secret?', { expiresIn: 7200 })
                aluno.token = token,
                await aluno.save()
                bcrypt.compare(senha, aluno.senha, (err, result) => {
                    if(!err){
                        if(result){
                            return res.status(200).json({
                                auth: true,
                                matricula: aluno.matricula,
                                nome: aluno.nome,
                                token: aluno.token
                            })
                        } else {
                            return res.status(401).json({
                                auth: false,
                                info: 'Senha incorreta'
                            })
                        }
                    } else {
                        return res.status(400).json({ erro: err })
                    }
                })

            } else {
                return res.status(400).json({ erro: 'Aluno não encontrado' })
            }
        } else {
            return res.status(400).json({ erro: 'Campos inválidos' })
        }
    }
}