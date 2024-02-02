//Creo modelo de usuarios para implementar posteriormente la BD
//Representacion de userDataBase.json
const fs = require('fs'); //Requerimos libreria fs
const { all } = require('../routers/mainPageRouter');



const User = {
    //Traemos el path para userDataBase.json
    fileName: './src/data/userDataBase.json',

    //Get Data desde el json
    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    //Metodo para generar un id para guardar los datos con id cuando crea un nuevo usuario
    generateId: function(){
    //Traemos a todos los usuarios que ya estan en el JSON
    let allUsers = this.findAll();
    //Obtenemos al ultimo usuario
    let lastUser = allUsers.pop();
    //Si no tenemos ningun id no tira error por esto ponemos un condicional para manejar este error, si hay un id partimos del ultimo id, de no ser asi creamos el 1
    if(lastUser) {
        return lastUser.id + 1
    }
    return 1
    },

    //Obtener todos los usuarios registrados en el JSON
    findAll: function(){
        return this.getData()
    },

    //Buscar un usuario por id
    findByPK: function(id){
        //Traemos a todos los usuarios que ya estan en el JSON
        let allUsers = this.findAll();
        //Corremos usuario por usuario y preguntamos si el id en BD coincide con el id que pasamos
        let userFound = allUsers.find(oneUser => oneUser.id === id)
        return userFound
    },

    //Buscar usuario a traves de cualquier campo de la BD (nombre, email...) Recordar que si hay mas de un usuario con la misma info nos trae el primero que se encuentre
    findByField: function(field, text){
        //Traemos a todos los usuarios que ya estan en el JSON
        let allUsers = this.findAll();
        //Corremos usuario por usuario y preguntamos si el field que se encuentra en la BD es igual al texto que me estan pasando
        let userFound = allUsers.find(oneUser => oneUser[field] === text)
        return userFound
    },


    //Crear y guardar un usuario
    create: function(userData) {
        //Traemos a todos los usuarios que ya estan en el JSON
        let allUsers = this.findAll();
        //Creamos la nueva informacion que tendra el nuevo usuario
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        //Hacemos un push al array e insertamos la informacion (userData)
        allUsers.push(newUser)
        //Escribirlo en el archivo json
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
        return newUser
    },

    //Eliminar un usuario
    delete: function(id){
    //Traemos a todos los usuarios que ya estan en el JSON
    let allUsers = this.findAll();  
    //Devolvemos a todos los usuarios menos al usuario que el id en la BD coincida con el id que nos llego
    let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
    //Volvemos  escribir ela archivo JSON
    fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '))
    return true
    },
}
//Exportamos el modelo
module.exports = User

// console.log(User.delete(5));