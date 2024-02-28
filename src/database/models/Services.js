module.exports = (sequelize, dataTypes) => {
    let alias = "Services";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DOUBLE,
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        profession: {
            type: dataTypes.STRING(100)
        },
        image: {
            type: dataTypes.STRING(500)
        },
        users_id: {
            type: dataTypes.INTEGER(11)
        }
    };
    let config = {
        tableName: "services",
        timestamps: false
    };
    const Service = sequelize.define(alias, cols, config);
    
    Service.associate = (models) => {
        Service.belongsTo(models.Users, {
            as: "users", // preguntar
            foreignKey: "users_id"
        })
    }

    return Service;
}