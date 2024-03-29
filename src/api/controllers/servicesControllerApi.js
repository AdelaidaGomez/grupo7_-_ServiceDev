const {Services} = require("../../database/models");

module.exports = {
    count: async(req, res) => {
        try {
            const services = await Services.findAll();
            res.status(200).json({
                status: 200,
                length: services.length,
                data: services
            });
        }catch(error) {
            console.log(error);
            res.status(400).json({error});
            }
    },
    especialidad: async(req, res) => {
        try{
            const especialidad = await Services.findOne({
                where: {
                    especialidad: req.params.especialidad
            }})
            res.status(200).json({
                status: 200,
                length: services.length,
                data: services
            });
        }
        catch(error) {
            console.log(error);
            res.status(400).json({error});
        }
    },
    detail: async(req, res) => {
        try{
            const services = await Services.findByPk(req.params.id)
            res.status(200).json({
                status: 200,
                data: services
            })
        }catch(error) {
            console.log(error);
            res.status(400).json({error});
        }
    }
}