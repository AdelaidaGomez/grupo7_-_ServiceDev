const {Users} = require("../../database/models");

module.exports = {
    list: async(req,res) => {
        try {
        const users = await Users.findAll();
        res.status(200).json({
            status: 200,
            total: users.length,
            data: users
        });
    }catch(error) {
        console.log(error);
        res.status(400).json({error});
        }
},

detail: async(req, res) => {
    try{
        const users = await Users.findByPk(req.params.id)
        res.status(200).json({
            status: 200,
            data: users
        })
    }catch(error) {
        console.log(error);
        res.status(400).json({error});
    }
}

}