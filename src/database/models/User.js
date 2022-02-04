module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_name: {
            type: dataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        email: {
            type: dataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(200),
            allowNull: false,
            unique: true
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    };
    let config = {
        timestamps: false,
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsTo(models.Category, {
            as: "category", 
            foreignKey: "category_id"
        })
    }
    User.associate = function(models) {
        User.hasMany(models.Book, {
            as: "users", 
            foreignKey: "user_id"
        })
    }
    User.associate = function(models) {
        User.hasMany(models.Favourite_book, {
            as: "favourite_books", 
            foreignKey: "user_id"
        })
    }
    User.associate = function(models) {
        User.hasMany(models.Transaction, {
            as: "transactions", 
            foreignKey: "user_id"
        })
    }

    return User
};