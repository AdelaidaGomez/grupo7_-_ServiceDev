// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();

// Modulo nativo para manejar las rutas de los archivos
const path = require("path");

// Usando recursos estáticos.
app.use(express.static('./public'))
// const publicFolderPath = path.resolve(__dirname, "../public")
// app.use(express.static(publicFolderPath));

// ubicacion de los template engine
app.set("views", path.join(__dirname, "views"));

// Configuracion del express cual es el motor de plantillas, dos parametros string:
// 1. variable de las vistas y 
// 2.motor de plantilla
app.set("view engine", "ejs");

// Ponemos a escuchar el servidor
app.listen(3050, () => {
    console.log("Servidor corriendo en http://localhost:3050")
});

//Para tomar los datos del body (service create form)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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