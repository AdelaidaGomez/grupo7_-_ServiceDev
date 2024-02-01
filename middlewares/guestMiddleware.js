function guestMiddleware(req, res, next) {
    if (req.session.usuarioLogueado == undefined) {
        next();
    } else {
        return res.redirect("index")
    }
}

module.exports = guestMiddleware;