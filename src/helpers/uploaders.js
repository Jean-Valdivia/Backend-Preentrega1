const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(__dirname)
        cb(null, __dirname + '/.././public/uploads/');      
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const uploader = multer({
storage,
  limits: { fileSize: 1024 * 1024 } // 1MB
});


module.exports = uploader.single('myfile');