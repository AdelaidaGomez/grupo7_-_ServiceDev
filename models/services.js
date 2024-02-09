const fs = require('fs'); //Requerimos libreria fs


//Representacion del json serviceDataBase
const Service = {

    //variable con la ruta del archivo json de los services
    filename: './src/data/servicesDataBase.json',

    //metodo para obtener todos los datos del json de services
    getService: function() {
        return JSON.parse(fs.readFileSync(this.filename, 'utf-8'));
    },

    //metodo para obtener ultimo id y guardar nuevo servicio
    generateIdser: function() {
        let allServices = this.findAll();

    //obtener el ultimo id
    let lastService = allServices.pop();

    //Si hay ningun id se genera el id 1
    if(lastService) {
        return lastUser.id + 1
    }
    return 1
    },

    }


    //metodo para traer todos los servicios
    findAll: function() {
        return this.getService();

    },

    //metodo para recuperar un unico service por id
    findByPk: function(id) {

        let allServices = this.findAll();
        let serviceFound= allServices.find(oneService => oneService.id == id);
        return serviceFound;

    },

    //metodo para buscar un service por uno de sus campos
    findByField: function(field, text) {

        let allServices = this.findAll();
        let serviceFound = allServices.find(oneService => oneService[field] == text);
        return serviceFound;
    },
    createService: function (service) {
        let allServices = this.findAll();
        let newService = 

    }
}

//console.log(Service.getService());
//console.log(Service.findByPk(3));
//console.log(Service.findByField('name','Mariana Gómez'));