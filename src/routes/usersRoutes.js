const express = require('express');
const router = express.Router();

const usersDB = require('../controllers/usersDB');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const path = require("path");
const multer = require("multer");
const validateRegister = require('../middlewares/validateRegister');

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
router.get('/login', guestMiddleware, usersDB.login);

router.post('/login', usersDB.loginProcess);

router.get('/register', guestMiddleware, usersDB.register);

router.post('/register', upload.single('images'), validateRegister, usersDB.create);

router.get('/profile', authMiddleware, usersDB.profile);

router.get('/edit/:id', usersDB.editar);
router.patch('/edit/:id', usersDB.actualizar);

router.get('/logout', usersDB.logout);

module.exports = router;