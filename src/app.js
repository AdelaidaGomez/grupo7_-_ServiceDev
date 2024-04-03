// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();
const bycrypt = require('bcryptjs');
const methodOverride = require("method-override"); // Para poder usar los metodos PUT y DELETE
const session = require("express-session"); // Requerimos session
const path = require("path"); // Modulo nativo para manejar las rutas de los archivos
const cookies = require("cookie-parser");


//Middleware para manipular la barra de navegacion
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware')


//Para tomar los datos del body del formulario (service create form)
app.use(express.urlencoded({extended: false})); //Tomar datos del body
app.use(express.json()); //Tomar datos del body
app.use(methodOverride("_method")); //Para metodos PUT y DELETE
app.use(express.static('./public')); // Usando recursos estáticos.


// Usamos el session
app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(cookies());

app.use(userLoggedMiddleware) // debe ir aca por que va despues de la sesion

// const publicFolderPath = path.resolve(__dirname, "../public")
// app.use(express.static(publicFolderPath));

// ubicacion de los template engine
app.set("views", path.join(__dirname, "views"));

// Configuracion del express cual es el motor de plantillas, dos parametros string:
// 1. variable de las vistas y 
// 2.motor de plantilla
app.set("view engine", "ejs");



// Manejando rutas con MVC
// Requerimos los routers que vamos a necesitar (Uno por cada archivo)
const mainPageRouter = require('../routers/mainPageRouter.js');
const userRouter = require('../routers/userRouter.js');
const servicesRouter = require('../routers/servicesRouter.js'); //Ruta para los Servicios
//APIs routes
const servicesApiRoutes = require("./api/routers/servicesApiRoutes.js");
const usersApiRouter = require('./api/routers/usersApiRouter.js');



// Generamos la ruta segun los routers
app.use('/', mainPageRouter);
app.use('/register', userRouter);
app.use('/login', userRouter);
app.use('/services', servicesRouter);
app.use('/productCart', servicesRouter);
// APIs routes
app.use("/api/services", servicesApiRoutes);
app.use("/api/users", usersApiRouter); 

// Ponemos a escuchar el servidor
app.listen(3050, () => {
    console.log("Servidor corriendo en http://localhost:3050")
});
