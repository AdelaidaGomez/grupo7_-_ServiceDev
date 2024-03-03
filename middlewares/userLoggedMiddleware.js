//1. Middleware de app global
//Middleware de aplicacion para modificar el menu de arriba y no mostrar las opciones register, logIn o Productcart

// Traigo el modelo de usuario
const User = require("../models/User");

function userLoggedMiddleware(req, res, next) {
    //Controla si muestra o no alguna parte de la barra de navegacion como una variable local
    res.locals.isLogged = false
    
    // RECORDAR USUARIO

    // Creo variable donde guardo la cookie userEmail
    let emailInCookie = req.cookies.userEmail;

    // Creo variable donde guardo al usuario encontrado por el email que se encuentra en la cookie
    let userFromCookie = User.findByField("email", {emailInCookie});

    // Si hay un usuario en la cookie, entonces lo guardo en session
    if(userFromCookie) {
        req.session.userLogged = userFromCookie;
    }

    //Si tenemos a alguien en sesion cambiamos el valor de la variable
    if (req.session.userLogged) {
        res.locals.isLogged = true
        //Podemos pasarlo la informacion que tenemos de sesion a una variable local para despues usarlas en las vistas
        res.locals.userLogged = req.session.userLogged
    }

    next()
}
module.exports = userLoggedMiddleware