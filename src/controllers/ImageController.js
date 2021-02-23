const Image = require('./../models/Image')

module.exports = {
    async create(req, res) {
        console.log(req.file.filename)
        if(req.file.filename) {
            const img = await Image.create({ nome: req.file.filename })

            return res.status(200).json({ nome: img.nome })
        }


        return res.status(400).json({ erro: req.file.filename })
    }
}