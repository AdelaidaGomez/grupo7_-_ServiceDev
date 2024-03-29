const {Services} = require("../../database/models");

module.exports = {
    count: async(req, res) => {
        try{
            const totalServices = await Services.findAll();
            res.status(200).json({
                total_Services: totalServices.length
            })
        }catch(error) {
            console.log(error);
            res.status(400).json({error});
            }
    },
    services: async (req, res) => {
        try {
            // Busco todos los servicios existentes y los guardo en una constante
            const services = await Services.findAll();
            // Recorro el array de objetos lit "services" para entregar otro array con la info detallada en serviceData
            const responseData = services.map(service => {
                // Crear un nuevo objeto JSON para cada servicio
                const serviceData = {
                    id: service.id,
                    name: service.name,
                    description: service.description,
                    dbRelations: ["users_id"], // Asignar dbRelations al nuevo objeto JSON
                    detailURL: `http://localhost:3050/api/services/detail/${service.id}` // Asignar detailURL al nuevo objeto JSON
                };
                return serviceData;
            });
            res.status(200).json({
                status: 200,
                length: responseData.length,
                data: {
                    services: responseData
                }
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    },
    profession: async (req, res) => {
        try {
            const profession = await Services.findAll({
                where: {
                    profession: req.params.profession
                }
            });
            res.status(200).json({
                status: 200,
                length: profession.length,
                data: profession
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    },
    detail: async(req, res) => {
        try{
            const service = await Services.findByPk(req.params.id)
                const serviceDetail = {
                    id: service.id,
                    name: service.name,
                    price: service.price,
                    description: service.description,
                    profession: service.profession,
                    users_id: service.users_id,
                    dbRelations: ["users_id"],
                    imageURL: `/public/images/fotoPerfilServicios/${service.image}`
                }
            res.status(200).json({
                status: 200,
                data: {
                    service: serviceDetail
                }
            })
        }catch(error) {
            console.log(error);
            res.status(400).json({error});
        }
    }
}