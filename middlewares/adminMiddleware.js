//No habilitar productCart sin que el usuario ete logueado
function adminMiddleware(req, res, next) {
    //Si no tenemos a nadie en sesion entonces queremos que se redirija al logIn
    if (!req.session.userLogged) {
        res.redirect('/services')
    }
    //Si tenemos a alguien en sesion entonces que lo deje acceder a productCart
    next()
}

module.exports = adminMiddleware;