const path = require('path')
const multer = require('multer')

module.exports = {
    dest: path.resolve(__dirname, "..", "uploads"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "tmp", "uploads"))
        },
        filename: (req, file, cb) => {
            const nome = file.originalname
            cb(null, nome)
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/jpg',
            'image/png',
            'image/gif'
        ]

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Formato inválido'))
        }
    }
}