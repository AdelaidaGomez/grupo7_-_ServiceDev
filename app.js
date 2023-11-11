// Requerimos express y lo ejecutamos para tener disponibles todos los metodos que vamos a precisar
const express = require("express");
const app = express();

// Modulo nativo para manejar las rutas de los archivos
const path = require("path");

// Usando recursos estáticos.
const publicFolderPath = path.resolve(__dirname, "./public")
app.use(express.static(publicFolderPath));

// Ponemos a escuchar el servidor
app.listen(3050, () => {
    console.log("Servidor corriendo en http://localhost:3050")
});

// Definimos las rutas a los distintos pedidos que nuestro sitio sabe responder
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views/index.html"))
})
