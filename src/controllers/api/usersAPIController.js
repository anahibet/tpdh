const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const usersAPIController = {

    list: (req, res) => {
        db.User.findAll({
            raw: true,
            attributes: ['user_id', 'user_firstname', 'user_lastname', 'user_email']
        })
            .then(users => {
                let newUsers = users.map(user => {
                    user.name = user.user_firstname + ' ' + user.user_lastname;
                    user.email = user.user_email;
                    delete user.user_firstname;
                    delete user.user_lastname;
                    delete user.user_email;
                    user.detail = '/api/users/' + user.user_id;
                    return user;
                })

                let respuesta = {
                    count: users.length,
                    users: newUsers
                }
                res.json(respuesta)
            })
            .catch(error => {
                res.json(error)
            })
    },

    detail: (req, res) => {
        db.User.findByPk(req.params.id).then(user => {

            let respuesta = {
                user_id: user.user_id,
                user_firstName: user.user_firstname,
                user_lastName: user.user_lastname,
                user_image: '/img/users/' + user.user_image,
                user_email: user.user_email,
            }
            res.json(respuesta)
        })
            .catch(error => {
                res.json(error)
            })

    }
}

module.exports = usersAPIController;
