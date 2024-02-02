//No entrar a register o logIn si el usuario ya esta registrado
function guestMiddleware(req, res, next) {
    //preguntamos si ya tenemos a alguien en sesion y si tenemos a alguien logheado lo mandamos a productCart
    if (req.session.userLogged) {
        return res.redirect('/services/productCart')
    }
    //Si no hay nadie en sesion ejecuta next() y deja acceder al controlador desde routes
    next()
}

module.exports = guestMiddleware;