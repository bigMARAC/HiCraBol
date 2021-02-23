const Aluno = require('./../models/Aluno')
const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const { json } = require('sequelize')

module.exports = {
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
                                senha: hash
                            })

                            return res.status(200).json({ aluno })
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
                bcrypt.compare(senha, aluno.senha, (err, result) => {
                    if(!err){
                        if(result){
                            return res.status(200).json({
                                auth: true,
                                matricula: aluno.matricula,
                                nome: aluno.nome
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