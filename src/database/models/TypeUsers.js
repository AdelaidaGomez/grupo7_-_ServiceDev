module.exports = (sequelize, dataTypes) => {
    let alias = "TypeUsers";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        typeUsers: {
            type: dataTypes.STRING(50)
        }
    };
    let config = {
        tableName: "type_users",
        timestamps: false
    };
    const TypeUser = sequelize.define(alias, cols, config);
    
    TypeUser.associate = (models) => {
        TypeUser.hasMany(models.Users, {
            as: "users", // preguntar
            foreignKey: "type_users_id"
        })
    }

    return TypeUser;
}