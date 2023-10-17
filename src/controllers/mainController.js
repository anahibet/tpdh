const fs = require('fs');
const path = require('path');



const mainController = {
    home: (req,res) => {
        return res.render('home/home');
    },

}

module.exports = mainController;