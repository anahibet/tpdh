module.exports = (sequelize, dataTypes) => {
    let alias = 'Category';
    let cols = {
        category_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        category_name: {
            type: dataTypes.STRING(30),
            allowNull: false
        },
        category_active: {
            type: dataTypes.BOOLEAN,
            allowNull: false
        }
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.hasMany(models.User, { // models.Movie -> Movies es el valor de alias en movie.js
            as: "users",
            // through: 'User_movie',
            foreignKey: 'user_category_id',
            // otherKey: 'movie_id',
            // timestamps: false
        })
    }

    return Category
};