// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();

// Modulo nativo para manejar las rutas de los archivos
const path = require("path");

// Usando recursos estáticos.
app.use(express.static('./public'))
// const publicFolderPath = path.resolve(__dirname, "../public")
// app.use(express.static(publicFolderPath));

// Ponemos a escuchar el servidor
app.listen(3050, () => {
    console.log("Servidor corriendo en http://localhost:3050")
});

// Manejando rutas con MVC
// Requerimos los routers que vamos a necesitar (Uno por cada archivo)
const mainPageRouter = require('../routers/mainPageRouter.js')

// Generamos la ruta segun los routers
app.use('/', mainPageRouter)
app.use('/register', mainPageRouter)
app.use('/login', mainPageRouter)
app.use('/productDetail', mainPageRouter)
app.use('/productCart', mainPageRouter)