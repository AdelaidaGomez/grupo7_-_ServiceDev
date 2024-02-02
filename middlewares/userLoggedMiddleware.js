//Middleware de aplicacion para modificar el menu de arriba y no mostrar las opciones register, logIn o Productcart
function userLoggedMiddleware(req, res, next) {
    //Controla si muestra o no alguna parte de la barra de navegacion como una variable local
    res.locals.isLogged = false
    
    //Si tenemos a alguien en sesion cambiamos el valor de la variable
    if (req.session.userLogged) {
        res.locals.isLogged = true
        //Podemos pasarlo a una variable local para tener la info de sesion
        req.locals.userLogged = req.session.userLogged
    }

    next()
}
module.exports =userLoggedMiddleware