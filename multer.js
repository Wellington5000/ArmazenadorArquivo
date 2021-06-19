const multer = require('multer')

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        },
        fileFilter: (req, file, cb) => {
            const isAccepted = ['arquivo/doc', 'arquivo/pdf'].find(formatoAceito => formatoAceito == file.mimetype);
            if (isAccepted) {
                return cb(null, true);
            }
            return cb(null, false);
        }
    })
})
)