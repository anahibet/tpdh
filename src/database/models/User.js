module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        user_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        user_firstname: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        user_lastname: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        user_email: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        user_password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        user_image: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        user_active: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    };
    let config = {
        tableName : 'users',
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config); 

    User.associate = function (models) {
        User.belongsTo(models.Category, { // models.Category -> Movies es el valor de alias en movie.js
            as: "categories",
            // through: 'User_movie',
            foreignKey: 'user_category_id',
            // otherKey: 'movie_id',
            // timestamps: false
        })
    }

    return User
};
