const express = require('express');
const router = express.Router();

const adminDB = require('../controllers/adminDB');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require("path");
const multer = require("multer");
const validateRegister = require('../middlewares/validateRegister');
const adminMiddleware = require('../middlewares/adminMiddleware');

// // Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = path.join(__dirname, '../../public/img/users');
        cb(null, folder);
    },
    filename: function(req, file, cb) {

        let imageName = 'user' + Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if ((file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")) {
            console.log(file);
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Imagenes en formato .png / .jpg / .jpeg'));
        }
    }
});



//Creación y guardado de un usuario nuevo
router.get('/register', adminDB.create);
router.post('/register', upload.single('images'), validateRegister, adminDB.guardar);

//Listado de Usuarios
router.get('/userList', adminDB.listado);

//Detalle de un producto
router.get('/profile/:id', adminDB.profile);

//Edición y actualización de un usuario
router.get('/editaAdmin/:id', adminDB.editar);
router.post('/editaAdmin/:id', adminDB.actualizar);


