function authMiddleware(req, res, next) {
    if (req.session.usuarioLogueado != undefined) {
        next();
    } else {
        return res.redirect("login")
    }
}

module.exports = authMiddleware;