const db = require("../database/models");
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const { Op } = require("sequelize");
const adminMiddleware = require('../middlewares/adminMiddleware'); 



const adminDB = {
 

    create: [adminMiddleware, async function(req, res) {
        const resultValidation = validationResult(req);
    
        if (resultValidation.errors.length > 0) {
            return res.render("users/register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
    
        try {
            const userInDB = await db.User.findOne({
                where: {
                    user_email: req.body.email
                }
            });
    
            if (userInDB) {
                return res.render('users/register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
    
            await db.User.create({
                user_category_id:  req.body.userCategory,
                user_firstname: req.body.firstName,
                user_lastname: req.body.lastName,
                user_email: req.body.email,
                user_password: bcryptjs.hashSync(req.body.password, 10),
                user_image: req.file.filename,
                user_active: 1
            });
    
            res.redirect("/users/editaAdmin");
        } catch (error) {
            console.log(error);
        }
    
    }],

   
    profile: (req, res) => {
        return res.render("users/profile", {
            user: req.session.userLogged
        });
    },

    editar: [adminMiddleware, function(req, res) {
        // La edición de usuarios solo está permitida para administradores
        db.User.findByPk(req.params.id)
            .then(function(userToEdit) {
                res.render("users/editaAdmin.ejs", { userToEdit: userToEdit })
            })
    }],

    actualizar: [adminMiddleware, function(req, res) {
        // La actualización de usuarios solo está permitida para administradores
        db.User.update({
            user_category_id: req.body.userCategory,
            user_firstname: req.body.firstName,
            user_lastname: req.body.lastName,
            user_email: req.body.email,
            user_password: hashedPassword,
            user_image: req.file.filename,
            user_active: 1
        }, {
            where: {
                user_id: req.params.id
            }
        });
        res.redirect("/users/profile");
    }],

  
}

module.exports = adminDB;