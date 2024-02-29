module.exports = (sequelize, dataTypes) => {
    let alias = "Users";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            
        },
        name: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(20),
            allowNull: false
        },
        // avatar: {
        //     type: dataTypes.STRING(500)
        // },
        type_users_id: {
            type: dataTypes.INTEGER(11)
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    };
    const User = sequelize.define(alias, cols, config);
    
    User.associate = (models) => {
        User.belongsTo(models.TypeUsers, {
            as: "typeUsers", // preguntar
            foreignKey: "type_users_id"
        })
    }

    // User.associate = (models) => {
    //     User.belongsTo(models.Services, {
    //         as: "service", // preguntar
    //         foreignKey: "users_id"
    //     })
    // }

    return User;
}