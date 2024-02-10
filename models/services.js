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
        return lastService.id + 1
    }
    else {
        return 1
    }
},

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

    //metodo para crear un nuevo servicio
    createService: function (service) {
        let allServices = this.findAll();

        //datos para crear nuevo servicio
        let newService = {
            id: this.generateIdser(),
            ...service
        }
        //se carga al array con un push e insertamos la informacion (service)
        allServices.push(newService)
        //Escribir en el archivo json
        fs.writeFileSync(this.filename, JSON.stringify(allServices, null, ' '));
        return newService

    },

     //Eliminar un usuario
     delete: function(id){
        //Traemos a todos los servicios que ya estan en el JSON
        let allServices = this.findAll();  
        //Devolvemos todos los servicios menos el servicio que el id en la BD coincida con el id que nos llego
        let finalServices = allServices.filter(oneService => oneService.id !== id);
        //Volvemos  escribir ela archivo JSON
        fs.writeFileSync(this.filename, JSON.stringify(finalServices, null, ' '))
        return true
        },
    }
    //Exportamos el modelo
    module.exports = Service


//console.log(Service.getService());
//console.log(Service.findByPk(3));
//console.log(Service.findByField('name','Mariana Gómez'));
//console.log(Service.createService({name: 'Danna Gallego', price: '65', description: 'Programadora Ruby', especialidad: 'Ingeniero Informatico', image: 'persona8.png',category:'otra'}));

//console.log(Service.delete(2))