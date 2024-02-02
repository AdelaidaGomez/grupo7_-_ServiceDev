// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();
const bycrypt = require('bcryptjs');
// Para poder usar los metodos PUT y DELETE
const methodOverride = require("method-override");



//Para tomar los datos del body del formulario (service create form)
app.use(express.urlencoded({extended: false})); //Tomar datos del body
app.use(express.json()); //Tomar datos del body
app.use(methodOverride("_method")); //Para metodos PUT y DELETE
app.use(express.static('./public')); // Usando recursos estáticos.

// Modulo nativo para manejar las rutas de los archivos
const path = require("path");

// Requerimos session
const session = require("express-session");


// const publicFolderPath = path.resolve(__dirname, "../public")
// app.use(express.static(publicFolderPath));

// ubicacion de los template engine
app.set("views", path.join(__dirname, "views"));

// Configuracion del express cual es el motor de plantillas, dos parametros string:
// 1. variable de las vistas y 
// 2.motor de plantilla
app.set("view engine", "ejs");

// Usamos el session
app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
}));




// Manejando rutas con MVC
// Requerimos los routers que vamos a necesitar (Uno por cada archivo)
const mainPageRouter = require('../routers/mainPageRouter.js');
const userRouter = require('../routers/userRouter.js');
const servicesRouter = require('../routers/servicesRouter.js'); //Ruta para los Servicios



// Generamos la ruta segun los routers
app.use('/', mainPageRouter);
app.use('/register', userRouter);
app.use('/login', userRouter);
app.use('/services', servicesRouter);
app.use('/productCart', servicesRouter);

// Ponemos a escuchar el servidor
app.listen(3050, () => {
    console.log("Servidor corriendo en http://localhost:3050")
});
