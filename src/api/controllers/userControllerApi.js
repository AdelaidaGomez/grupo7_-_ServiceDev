const {Users} = require("../../database/models");

module.exports = {
    count: async(req,res) => {
        try{
        const totalUsers = await Users.findAll();
        res.status(200).json({
            total_users: totalUsers.length
        })
    }catch(error) {
        console.log(error);
        res.status(400).json({error});
        }
},

alls: async (req, res) => {
    try {
        // Busco todos los usuarios existentes y los guardo en una constante
        const users = await Users.findAll();
        // Recorro el array de objetos lit "users" para entregar otro array con la info detallada en userData
        const responseData = users.map(user => {
            // Crear un nuevo objeto JSON para cada servicio
            const userData = {
                id: user.id,
                name: user.name,
                email: user.email,
                dbRelations: ["type_users_id"], // Asignar dbRelations al nuevo objeto JSON
                detailURL: `/public/images/fotoPerfilusuarios/${user.avatar}` // Asignar detailURL al nuevo objeto JSON
            };
            return userData;
        });
        res.status(200).json({
            status: 200,
            length: responseData.length,
            data: {
                users: responseData
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
},

detail: async(req, res) => {
    try{
        const user = await Users.findByPk(req.params.id)
            const userDetail = {
                id: user.id,
                name: user.name,
                email: user.email,
                dbRelations: ["type_users_id"],
                avatar: '/public/images/fotoPerfilusuarios/${user.avatar}'
            }
        res.status(200).json({
            status: 200,
            data: {
                user: userDetail
            }
        })
    }catch(error) {
        console.log(error);
        res.status(400).json({error});
    }
}

}