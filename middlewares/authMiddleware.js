function authMiddleware(req, res, next) {
    let user = true;
    if (req.body) {
        res.locals.user = usuarioALoguearse;
        next();
    } else {
        res.render("header")
    }
}

module.exports = authMiddleware;