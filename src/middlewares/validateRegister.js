const path = require('path');
const { body } = require('express-validator');

// Función para verificar el tamaño del archivo (1 MB)
const validateFileSize = (value, { req }) => {
    let file = req.file;
    if (!file) {
        return true; // No hay archivo adjunto, no hay problema.
    }

    if (file.size > 1048576) {
        throw new Error('El archivo debe ser menor o igual a 1 MB.');
    }

    return true;
};

// Validaciones
module.exports = [
    body('firstName')
        .notEmpty().withMessage('Ingrese su nombre por favor')
        .isLength({ min: 2}).withMessage('Debe tener al menos 2 letras'),
    body('lastName')
        .isLength({ min: 2}).withMessage('Debe tener al menos 2 letras')
        .notEmpty().withMessage('Ingrese su apellido por favor'),
    body('email')
        .notEmpty().withMessage('Ingrese su email por favor').bail()
        .isEmail().withMessage('Ingrese un formato de correo válido'),
    body('password')
        .notEmpty().withMessage('Ingrese una contraseña por favor')
        .isLength({ min: 8}).withMessage('Debe tener al menos 8 caracteres')
        .matches(/[a-z]/).withMessage('Debe tener al menos una letra minúscula.')
        .matches(/[A-Z]/).withMessage('Debe tener al menos una letra mayúscula.')
        .matches(/[0-9]/).withMessage('Debe tener al menos un número.')
        .matches(/[@$.!%#?&]/).withMessage('Debe tener al menos un caracter especial(@$.!%#?&).'),
    body('image').custom((value, { req }) => {
        validateFileSize(value, { req }); // Verifica el tamaño del archivo
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!file) {
            throw new Error('Elige una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }
        return true;
    })
];
