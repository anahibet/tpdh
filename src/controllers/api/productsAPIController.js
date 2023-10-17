const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');

const productsAPIController = {

    list: (req, res) => {
        db.Product.findAll({
            raw: true,
            attributes: ['product_id','product_name', 'product_description']
        })
            .then(products => {
                let newProducts = products.map(product => {
                    product.name = product.product_name;
                    product.description = product.product_description;
                    delete product.product_name;
                    delete product.product_description;
                    product.detail = '/api/products/' + product.product_id;
                    return product;
                })

                let respuesta = {
                    count: products.length,
                    products: newProducts
                }
                res.json(respuesta)
            })
            .catch(error => {
                res.json(error)
            })
    },

    detail: (req, res) => {
        db.Product.findByPk(req.params.id)
        .then(product => {

            let respuesta = {
                product_id: product.product_id,
                product_name: product.product_name,
                product_image: '/img/products/' + product.product_image,
            }
            res.json(respuesta)
        })
            .catch(error => {
                res.json(error)
            })

    }
}

module.exports = productsAPIController;