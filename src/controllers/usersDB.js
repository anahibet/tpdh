const db = require("../database/models");
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersController = {
    register: (req, res) => {
        return res.render("users/register");
    },

    login: (req, res) => {
        return res.render("users/login");
    },

    create: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.render("users/register", {
                errors: errors.array(),
                oldData: req.body
            });
        }

        try {
            const existingUser = await db.User.findOne({
                where: {
                    user_email: req.body.email
                }
            });

            if (existingUser) {
                return res.render('users/register', {
                    errors: [{
                        msg: 'Este email ya está registrado'
                    }],
                    oldData: req.body
                });
            }

            const hashedPassword = await bcryptjs.hash(req.body.password, 10);

            await db.User.create({
                user_category_id: 2,
                user_firstname: req.body.firstName,
                user_lastname: req.body.lastName,
                user_email: req.body.email,
                user_password: hashedPassword,
                user_image: req.file.filename,
                user_active: 1
            });

            res.redirect("/users/login");
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    loginProcess: async (req, res) => {
        try {
            const userToLogin = await db.User.findOne({
                where: {
                    user_email: req.body.email
                }
            });

            if (userToLogin) {
                const isPasswordValid = await bcryptjs.compare(req.body.password, userToLogin.user_password);

                if (isPasswordValid) {
                    req.session.userLogged = userToLogin;
                    return res.redirect('/users/profile');
                }

                return res.render('users/login', {
                    errors: [{
                        msg: 'Credenciales inválidas.'
                    }]
                });
            }

            return res.render('users/login', {
                errors: [{
                    msg: 'No se encuentra el correo en la base de datos'
                }]
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    profile: (req, res) => {
        return res.render("users/profile", {
            user: req.session.userLogged
        });
    },

    editar: async (req, res) => {
        try {
            const userToEdit = await db.User.findByPk(req.params.id);
            res.render("users/editarPas.ejs", { userToEdit });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    actualizar: async (req, res) => {
        try {
            await db.User.update(
                {
                    user_firstname: req.body.firstName,
                    user_lastname: req.body.lastName
                },
                {
                    where: {
                        user_id: req.params.id
                    }
                }
            );

            res.redirect("/users/profile");
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
};

module.exports = usersController;