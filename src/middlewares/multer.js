const path = require("path");
const multer = require("multer");

// Multer
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       let folder = path.join(__dirname, '../../public/img/users');
       cb(null, folder);
   },
   filename: function (req, file, cb) {
       let imageName = 'user' + Date.now() + path.extname(file.originalname);
       cb(null, imageName);
   }
})

const upload = multer({ storage: storage });

module.exports = upload;